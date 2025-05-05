export interface ChatType {
    id? : string ,
    created_at?  : string ,
    user1_id : string ,
    user2_id : string ,
}
export interface ChatUserData {
    id : string,
    created_at : string,
    user1_id: {
    user_id : string,
    fullName : string,
    avatar_url : string,
    },
    user2_id: {
    user_id : string,
    },
}

