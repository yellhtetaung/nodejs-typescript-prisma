export interface SingleUser {
	id?: string;
	username: string;
	email: string;
	role?: "USER" | "ADMIN";
	image?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface User extends SingleUser {
	password: string;
}
