import { GalleryVerticalEnd } from "lucide-react";
import LoginForm from "@/components/login-form";
import { supabaseClient } from "@/config/dbConfig";
import InvalidClientUI from "@/components/states/404";
import InternalServerError from "@/components/states/500";

export default async function LoginPage({ searchParams }: {
  // params: Promise<{ client: string }>
  searchParams: Promise<{ id: string }>
}) {
  // const { client } = await params;
  const { id } = await searchParams;


  if (!id) {
    return <InvalidClientUI/>;
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
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          {data.client_name || "Secure Shell"}
        </a>

        <LoginForm app_data={data}/>
      </div>
    </div>
  );
}
