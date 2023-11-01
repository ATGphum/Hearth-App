export enum SubscriptionType {
  month = "month",
  year = "year",
}

export enum paymentMode {
  setup = "setup",
  payment = "payment",
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
  stripe_subscription_frequency: string;
  trial_completed: boolean;
}

export interface Quote {
  id: number;
  quote_text: string;
  author: string;
  todays_quote: boolean;
}

export enum CourseType {
  journey,
  category,
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

export interface Category {
  id: number;
  name: string;
  description: string;
  color: string;
  subscription_required: boolean;
  experiences: Experience[];
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
  customer_id: string;
  subscription_id: string;
  client_secret?: string;
  frequency: string;
  mode: paymentMode;
  amount_in_cents: number;
  currency: string;
}

export interface AddressElement {
  city: string | null;
  country: string | null;
  line1: string | null;
  line2: string | null;
  postal_code: string | null;
  state: string | null;
}
