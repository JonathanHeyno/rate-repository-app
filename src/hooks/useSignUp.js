import { useMutation } from '@apollo/client';
import { REGISTER } from '../graphql/mutations';


const useSignUp = () => {
    const [mutate, result] = useMutation(REGISTER);
    const signUp = async ({ username, password }) => {
      const mutationResult = await mutate({variables: {user: {username: username, password: password}}});

      return mutationResult;
    };
  
    return [signUp, result];
};

export default useSignUp;