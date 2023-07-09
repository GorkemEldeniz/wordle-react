interface User {
  id: number;
  username: string;
  password: string;
  scores?: Score[];
  created_at: Date;
}

interface Score {
  scoreID: number;
  userId: number;
  created_at: string;
  score: number;
  result: string;
  user: User;
}

interface FetchError {
  data: Score | User | object
  status : '400' | '500' | 'FETCH_ERROR'
}

export type {
  User,
  Score,
  FetchError
}
