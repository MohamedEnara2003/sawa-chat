

export interface followerType {
    id?: number;
    created_at?: string;
    follower_id: string;
    following_id: string;
}

export interface UserFollowerssData extends followerType{
    follower : {avatar_url: string, fullName: string},
    following : {avatar_url: string, fullName: string},
}
