'use client'
import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Toggle } from "@/components/ui/toggle"
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import { availableWidgets } from '@/config/availableWidgets'
import { Check } from 'lucide-react'
import { useWidgets } from '@/context/WidgetContext'

interface ClientState {
    id: number;
    widgetIds: string[];
}

const Header = () => {
    const { addWidget, removeWidget } = useWidgets();
    const { user, isLoaded } = useUser()
    const [client, setClient] = useState<ClientState>({
        id: 0,
        widgetIds: [] 
    })

    useEffect(() => {
        const createUser = async () => {
            try {
                const response = await fetch('/api/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: user?.id
                    }),
                })
                if (!response.ok) {
                    throw new Error('Failed to create user')
                }

                const data = await response.json()
              
                setClient({
                    ...data.data,
                    widgetIds: data.data.widgetIds || []
                })

            } catch (error) {
                console.error('Error:', error)
            }
        }

        if (isLoaded && user) {
            createUser()
        }
    }, [isLoaded, user])

    const widgetEntries = Object.values(availableWidgets)

    const widgets = widgetEntries.map((widget) => ({
        ...widget,
        status: client.widgetIds.includes(widget.widgetId)
    }))

    const handleWidgetToggle = async (widgetId: string, currentStatus: boolean) => {
        const action = currentStatus ? "REMOVE" : "ADD"
        try {
            setClient(prevState => ({
                ...prevState,
                widgetIds: currentStatus
                    ? prevState.widgetIds.filter(id => id !== widgetId)
                    : [...prevState.widgetIds, widgetId]
            }));

            if (action === 'ADD') {
                addWidget(widgetId)
            } else {
                removeWidget(widgetId)
            }

        } catch (error) {
            console.error('Error updating widget:', error);
        }
    };

    return (
        <header className='flex justify-between items-center py-2 px-5 border-b-2 shadow-xl mb-5'>
            <h1 className='text-2xl font-semibold w-full'>Dashboard</h1>
            <div className='w-full flex justify-center'>
                <SignedIn>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='text-xl font-medium'>Widgets</DropdownMenuTrigger>
                        <DropdownMenuContent onCloseAutoFocus={(e) => e.preventDefault()}>
                            {widgets.map((widget) => (
                                <DropdownMenuItem
                                    key={widget.widgetId}
                                    className='flex justify-between'
                                    onSelect={(e) => e.preventDefault()}
                                >
                                    {widget.name}
                                    <Toggle
                                        pressed={widget.status}
                                        onPressedChange={() => handleWidgetToggle(widget.widgetId, widget.status)}
                                    >
                                        {widget.status ? (
                                            <div className='bg-green-400 p-1 rounded'>
                                                <Check />
                                            </div>
                                        ) : (
                                            <div className='p-1 rounded'>
                                                <Check className='text-transparent' />
                                            </div>
                                        )}
                                    </Toggle>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SignedIn>
            </div>
            <div className='w-full flex justify-end'>
                <SignedIn>
                    <UserButton />
                </SignedIn>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
            </div>
        </header>
    )
}

export default Header