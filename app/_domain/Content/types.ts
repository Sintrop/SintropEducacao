export interface ContentContractProps {
  id: string;
  title: string;
  description: string;
  url: string;
  photo: string;
  upVotes: string;
  downVotes: string;
}

export interface ContentProps {
  id: number;
  title: string;
  description: string;
  url: string;
  photo: string;
  upVotes: number;
  downVotes: number;
  type: string;
}