


export type NotificationsTypes = 'follow' | 'like' | 'comment' 

export interface Notifications {
    id? : number ,
    created_at? : string ,
    type : NotificationsTypes
    from_user_id : string ,
    to_user_id : string ,
    post_id : number | null,
    avatar_url  : string ,
    fullName  : string ,
} 