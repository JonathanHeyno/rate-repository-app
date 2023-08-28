import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const useReviews = () => {
  const { data, error, loading, refetch } = useQuery(ME, { variables: { includeReviews: true }, fetchPolicy: 'cache-and-network', });
  const [result, setResult] = useState();
  if (error) {
    console.log(error);
  }

  useEffect(() => {
    setResult(data);
  }, [loading]);

  return { result, loading, refetch };
};

export default useReviews;