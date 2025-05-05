
export type postStatus = 'public' | 'followers' | 'privacy' 

export interface PostType {
    id? : number ,
    created_at? : string ,
    user_id : string ,
    value : string ,
    file_url? : string,
    file_name? : string,
    privacy : postStatus,
    comments_count? : {
    count : number
    },
    likes? : {
    count : number
    },
    isLiked? : boolean
} 

export interface UserPostData extends PostType{
    user : {avatar_url : string , fullName : string}
}

