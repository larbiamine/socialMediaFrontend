export interface User {
	_id: string;
	avatar: string;
	username: string;
	bio: string;
	lastname: string;
	gender: string;
	firstname: string;
	posts: Array<string>;
	followers: Array<string>;
	emailverification: string;
	following: Array<string>;
	notifications: Array<string>;
	active: boolean;
	accessToken: string;
	createdAt: string;
	email: string;
	updatedAt: string;
	privacy: string;
}

export interface Profile {
	firstname: string;
	lastname: string;
	bio: string;
	privacy: string;
	gender: string;
}

export interface NotificationProps {
	_id: string;
	content: {
		content: string;
		type: string;
		id: string;
	};
	userId: string;
	liker: string;
	postbody: string;
	seen: boolean;
	createdAt: string;
	user: {
		_id: string;
		username: string;
		avatar: string;
	};
}

export interface Post {
	_id: String;
	userId: String;
	body: String;
	createdAt: String;
	photos: Array<String>;
	comments: Array<String>;
	likes: Array<String>;
}

export interface HeadProps {
	user: User;
	currentUser: User;
	isFollowing: boolean;
}

export interface FollowersListProps {
	currentUser: User;
	open: boolean;
	setOpen: Function;
	userFollowers: Array<string>;
}
export interface FollowingListProps {
	currentUser: User;
	open: boolean;
	setOpen: Function;
	userFollowing: Array<string>;
}

export interface RedirectData {
	redirectURL: string;
}

export function isRedirectData(object: unknown): object is RedirectData {
	if (object !== null && typeof object === "object") {
		return "redirectURL" in object;
	}
}

export type partialUser = Pick<User, "username" | "avatar">;

export interface Comment {
	user: partialUser;
	postId: String;
	setNbComments: Function;
}
