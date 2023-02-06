export type SearchFiledProps = {
  setQueries: (queries: string[]) => void;
  queriesValue: string[];
};

export type SearchFiledType = (props: SearchFiledProps) => JSX.Element;
