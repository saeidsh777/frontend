import { SnackbarProvider, useSnackbar } from "notistack";

function MyApp({ variant }) {
  const { enqueueSnackbar } = useSnackbar();
  enqueueSnackbar("login", { variant });
}

export default function LoginAlert() {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyApp variant="success" />
    </SnackbarProvider>
  );
}
