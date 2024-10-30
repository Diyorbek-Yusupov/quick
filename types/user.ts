export interface IUser {
  id: number;
  uuid: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  birthday?: string;
  gender?: string;
  email_verified_at: string;
  registered_at: string;
  active: boolean;
  role: string;
  img: string;
}

export interface NotificationSetting {
  notification_id: number;
  active: number;
}

export interface UserNotification {
  id: number;
  type: string;
  payload: unknown | null;
  notification: NotificationSetting;
}

export interface UserDetail extends IUser {
  img: string;
  point: {
    user_id: number;
    price: string;
  };
  notifications: UserNotification[];
  referral_from_topup_price?: number;
  referral_from_topup_count?: number;
  my_referral?: string;
}

export interface SignInCredentials {
  email?: string;
  phone?: string;
  password: string;
}

export interface SignInResponse {
  access_token: string;
  token_type: string;
  user: UserDetail;
}

export interface SocialLoginCredentials {
  type: "google" | "facebook" | "apple";
  data: {
    name: string | null;
    email: string | null;
    id: string;
    avatar: string | null;
  };
}
