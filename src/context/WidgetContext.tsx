"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser } from '@clerk/nextjs';
import { availableWidgets } from '@/config/availableWidgets';

interface IWidget {
    id: string;
    name: string;
    component: () => React.JSX.Element;
}

interface WidgetContextType {
    widgets: IWidget[];
    loading: boolean;
    error: string | null;
    fetchUserWidgets: () => Promise<void>;
    addWidget: (widgetId: string) => Promise<void>;
    removeWidget: (widgetId: string) => Promise<void>;
}

const WidgetContext = createContext<WidgetContextType | undefined>(undefined);

export function WidgetProvider({ children }: { children: ReactNode }) {
    const { user, isLoaded } = useUser();
    const [widgets, setWidgets] = useState<IWidget[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUserWidgets = async () => {
        if (!user?.id) return;

        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`/api/user?userId=${user.id}`);
            if (!response.ok) throw new Error('Failed to fetch widgets');

            const { data } = await response.json();
            const widgetsList = data.widgetIds.map((widget: string) => ({
                id: widget,
                name: availableWidgets[widget as keyof typeof availableWidgets].name,
                component: availableWidgets[widget as keyof typeof availableWidgets].component
            }));

            setWidgets(widgetsList);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch widgets');
        } finally {
            setLoading(false);
        }
    };

    const addWidget = async (widgetId: string) => {
        try {
            const response = await fetch('/api/user', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user?.id,
                    widgetId,
                    action: 'ADD'
                })
            });

            if (!response.ok) throw new Error('Failed to add widget');
            await fetchUserWidgets();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to add widget');
        }
    };

    const removeWidget = async (widgetId: string) => {
        try {
            const response = await fetch('/api/user', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user?.id,
                    widgetId,
                    action: 'REMOVE'
                })
            });

            if (!response.ok) throw new Error('Failed to remove widget');
            await fetchUserWidgets();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to remove widget');
        }
    };

    useEffect(() => {
        if (isLoaded && user) {
            fetchUserWidgets()
        }
    }, [isLoaded, user]);

    return (
        <WidgetContext.Provider value={{
            widgets,
            loading,
            error,
            fetchUserWidgets,
            addWidget,
            removeWidget
        }}>
            {children}
        </WidgetContext.Provider>
    );
}

export function useWidgets() {
    const context = useContext(WidgetContext);
    if (context === undefined) {
        throw new Error('useWidgets must be used within a WidgetProvider');
    }
    return context;
}