import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals"
import { NotificationsService } from "../../features/notifications/service/notifications.service";
import { computed, inject } from "@angular/core";
import { Notifications, NotificationsTypes } from "../../core/interface/notifications";
import { catchError, EMPTY, of, tap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { UserStore } from "../users/users.signal";
import { SoundEffectStore } from "../sound/sound.signal";

interface NotificationsState {
    readonly notifications: Notifications[];
    readonly isLoading: boolean;
    readonly error: string;
}

const initialState: NotificationsState = {
    notifications: [],
    isLoading: false,
    error: '',
}

export const NotificationsStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),

    withComputed((store, userStore = inject(UserStore)) => {
        const currentUserId = computed(() => userStore.user_id());

        return {
            notificationsCount: computed(() => store.notifications().length),

            unreadNotifications: computed(() => 
                store.notifications().filter(notification => 
                    notification.to_user_id === currentUserId()
                )
            ),

            hasNotifications: computed(() => store.notifications().length > 0),
        };
    }),

    withMethods((store) => {
        const notificationsService = inject(NotificationsService);
        const userStore = inject(UserStore);
        const soundEffectStore = inject(SoundEffectStore);

        return {
            addNotification(
                type: NotificationsTypes,
                to_user_id: string,
                post_id: number | null
            ): void {
                if (userStore.user_id() !== to_user_id) {
                    const notification: Notifications = {
                        type,
                        from_user_id: userStore.user_id(),
                        to_user_id,
                        post_id,
                        avatar_url: userStore.user()?.avatar_url || '',
                        fullName: userStore.user()?.fullName || '',
                    }

                    notificationsService.addNotification(notification).subscribe();
                }
            },

            removeNotification(id: number): void {
                notificationsService.removeNotification(id).subscribe();
            },

            getNotifications(): void {
                patchState(store, ({ isLoading: true }));
                const user_id = userStore.user_id();
                if (user_id && store.notifications().length < 1) {
                    notificationsService.getNotifications(user_id).pipe(
                        tap((notifications) => {
                            patchState(store, ({ isLoading: false, notifications }));
                        }),
                        catchError((err: Error) => {
                            patchState(store, ({ isLoading: false, error: err.message }));
                            return of([]);
                        }),
                        takeUntilDestroyed()
                    ).subscribe();
                }
            },

            initRealTimeNotifications(): void {
                notificationsService.listenForNotifications().pipe(
                    tap((updated) => {
                        const { eventType: event, new: newData, old: oldData } = updated;
                        if (event === 'INSERT') {
                            if (newData.to_user_id === userStore.user_id()) {
                                soundEffectStore.handlSoundEffect('sound-effects/MessageNotification.mp3');
                            }
                            const notifications: Notifications[] = [...store.notifications(), newData]
                                .filter((notification) => {
                                    return notification.from_user_id !== userStore.user_id() && 
                                        notification.to_user_id === userStore.user_id();
                                });
                            patchState(store, ({ notifications }));
                        }
                        if (event === 'DELETE') {
                            const notifications: Notifications[] = store.notifications()
                                .filter((notification) => notification.id !== oldData.id);
                            patchState(store, ({ notifications }));
                        }
                    }),
                    catchError(() => EMPTY),
                    takeUntilDestroyed()
                ).subscribe();
            }
        };
    })
);