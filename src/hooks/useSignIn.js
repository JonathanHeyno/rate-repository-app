import { useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
    const apolloClient = useApolloClient();
    const authStorage = useAuthStorage();
    const [mutate, result] = useMutation(AUTHENTICATE);
    const navigate = useNavigate();
  
    const signIn = async ({ username, password }) => {
      const mutationResult = await mutate({variables: {credentials: {username: username, password: password}}});
      await authStorage.setAccessToken(mutationResult.data.authenticate.accessToken);
      if (mutationResult.data.authenticate.accessToken) {
        navigate("/");
      }

      apolloClient.resetStore();
      return mutationResult;
    };
  
    return [signIn, result];
};

export default useSignIn;