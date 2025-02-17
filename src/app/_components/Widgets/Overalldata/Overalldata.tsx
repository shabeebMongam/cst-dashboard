import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, DollarSign, UserRoundPlus, Users, X } from 'lucide-react'
import React from 'react'
import Cardo  from './Card'
import { ICardo } from '@/types/types'

const cardsData: ICardo[] = [
    {
        label: "Total Revenue",
        data: 5000,
        icon: <DollarSign />
    },
    {
        label: "Total Users",
        data: 52000,
        icon: <Users />
    },
    {
        label: "New Users",
        data: 5000,
        icon: <UserRoundPlus />
    },
    {
        label: "Active Users",
        data: 5000,
        icon: <Activity />
    },

]

const Overalldata = () => {
    return (
        <div className='grid sm:grid-cols-2 md:grid-cols-4 gap-4'>
            {
                cardsData.map((card) => {
                    return (
                        <Cardo key={card.label} label={card.label} data={card.data} icon={card.icon} />
                    )
                })
            }
        </div>
    )
}

export default Overalldata