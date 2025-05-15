import SignupForm from "@/components/signup-form"
import { supabaseClient } from "@/config/dbConfig";


export default async function SignupPage({ params, searchParams }: {
  params: Promise<{ client: string }>
  searchParams: Promise<{ id: string }>
}) {
  const { id } = await searchParams;
  const { data, error } = await supabaseClient
    .from("clients")
    .select("*")
    .eq("client_identifier", id)
    .maybeSingle();
  if (error) {
    console.error('Supabase error:', error);
  } else if (!data) {
    console.log('No client found with that identifier.');
  } else {
    console.log('Client data:', data);
  }


  const isValid = !error && !!data;
  if (!id) {
    return <SignupForm app_data={null} isValidClient={false} error="Client ID is missing" />;
  }
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <SignupForm app_data={data}
          isValidClient={isValid}
          error={!isValid ? "Invalid or missing client ID" : undefined} />
      </div>
    </div>
  )
}