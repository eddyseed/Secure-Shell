import SignupForm from "@/components/signup-form"
import InvalidClientUI from "@/components/states/404";
import InternalServerError from "@/components/states/500";
import { supabaseClient } from "@/config/dbConfig";


export default async function SignupPage({ searchParams }: {
  // params: Promise<{ client: string }>
  searchParams: Promise<{ id: string }>
}) {
  const { id } = await searchParams;
  if (!id) {
    return <InvalidClientUI />;
  }
  const { data, error } = await supabaseClient
    .from("clients")
    .select("*")
    .eq("client_identifier", id)
    .maybeSingle();
  if (error) {
    return <InternalServerError />
  } else if (!data) {
    return <InvalidClientUI />
  } else {
    console.log('Client data:', data);
  }
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <SignupForm app_data={data} />
      </div>
    </div>
  )
}