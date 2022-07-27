import { supabaseClient, User } from "@supabase/auth-helpers-nextjs";
import { Typography, Button } from "@supabase/ui";

const { Text } = Typography;

interface Props {
  user: User;
}

export const Dashboard = ({ user }: Props) => (
  <>
    <Text>Signed in: {user.email}</Text>
    <Button block onClick={() => supabaseClient.auth.signOut()}>
      Sign out
    </Button>
  </>
);
