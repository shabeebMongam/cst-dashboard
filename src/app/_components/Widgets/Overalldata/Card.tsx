import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ICardo } from '@/types/types'

import React from 'react'




const Cardo: React.FC<ICardo> = ({ label, data, icon }) => {
    return (
        <Card className='w-full'>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    {label}
                    {
                        <div className='h-4 w-4'>
                            {icon}
                        </div>
                    }
                </CardTitle>
            </CardHeader>
            <CardContent>
                {data}
            </CardContent>
        </Card>
    )
}

export default Cardo