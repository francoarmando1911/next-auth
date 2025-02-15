'use client'

import { Notification } from '@/components/Notification'
import { StatusNotification } from '@/interfaces'
import { createContext, JSX, useState, ReactNode, FC } from 'react'

interface IState {
    open: boolean
    status: StatusNotification
    msj: string | null
}

interface INotification extends IState {
    showNotification: (props: IState) => void
}

interface Props {
    children: ReactNode
}

const defaultState: IState = {
    open: false,
    status: null,
    msj: null
}

export const NotificationContext = createContext<INotification | null>(null)

export const NotificationProvider: FC<Props> = ({ children }) => {
    const [notification, setNotification] = useState<IState>(defaultState)

    const showNotification = (props: IState) => {
        if (props) {
            setNotification(props)

            setTimeout(() => {
                setNotification({ open: false, msj: null, status: null })
            }, 3000)
        }
    }

    return (
        <NotificationContext.Provider value={{ ...notification, showNotification }}>
            {children}
            {notification.open && <Notification status={notification.status} msj={notification.msj} />}
        </NotificationContext.Provider>
    )
}

export default NotificationContext
