import { GalleryVerticalEnd } from "lucide-react";
import LoginForm from "@/components/login-form";
import { supabaseClient } from "@/config/dbConfig";

export default async function LoginPage({ params, searchParams }: {
  params: Promise<{ client: string }>
  searchParams: Promise<{ id: string }>
}) {
  // const { client } = await params;
  const { id } = await searchParams;


  if (!id) {
    return <LoginForm app_data={null} isValidClient={false} error="Client ID is missing" />;
  }



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

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          {data.client_name || "Secure Shell"}
        </a>

        <LoginForm
          app_data={data}
          isValidClient={isValid}
          error={!isValid ? "Invalid or missing client ID" : undefined}
        />
      </div>
    </div>
  );
}
