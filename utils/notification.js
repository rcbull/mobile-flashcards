import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

export const STORAGE_KEY = 'MobileFlashcards:notifications'

function showNewNotification() {
    return {
        title: "It's time for the quiz",
        body: 'Hey, wake up! You did not answer the quiz today.',
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(STORAGE_KEY)
        .then(JSON.parse)
        .then(data => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(
                    ({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            const tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(20)
                            tomorrow.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                showNewNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day'
                                }
                            )

                            AsyncStorage.setItem(
                                STORAGE_KEY,
                                JSON.stringify(true)
                            )
                        }
                    }
                )
            }
        })
}
