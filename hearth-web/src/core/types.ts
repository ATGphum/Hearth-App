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
}

export interface Journey {
  id: number;
  level: string;
  name: string;
  description: string;
  color: string;
  subscription_required: boolean;
  experiences: Experience[];
  is_available: boolean;
}

export interface Experience {
  id: number;
  level: string;
  name: string;
  description: string;
  activity_type: string;
  duration: string;
  color: string;
  audio_link: string;
  image_link: string;
}
