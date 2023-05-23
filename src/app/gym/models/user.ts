export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: number;
  weight: number;
  height: number;
  gender: string;
  package: string;
  haveGymBefor: string;
  enquireyDate: Date;
  bmi: number;
  bmiResult: string;
  requireTrainer: string;
  important: string[];
}
