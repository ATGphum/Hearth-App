export enum SubscriptionType {
  monthly,
  yearly,
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  partner_first_name?: string;
  partner_last_name?: string;
  email_reminders?: boolean;
  instagram_username?: string;
  connection_time?: string;
  date_joined: string;
  stripe_subscription_id: string;
  stripe_customer_id: string;
}

export interface Journey {
  id: number;
  level: number;
  name: string;
  description: string;
  color: string;
  subscription_required: boolean;
  experiences: Experience[];
  is_available: boolean;
  completed: boolean;
}

export interface Experience {
  id: number;
  level: number;
  name: string;
  description: string;
  study?: string;
  activity_type: string;
  duration: string;
  color: string;
  audio_link: string;
  image_link: string;
  is_available: false;
  completed: boolean;
}

export interface UserExperience {
  id: number;
  completion_date: Date;
  experience_id: number;
  user_id: number;
  parent_course_id: number;
}

export interface SubscriptionDetail {
  subscription_id: string;
  client_secret: string;
}
