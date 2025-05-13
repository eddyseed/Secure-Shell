'use client';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Toaster } from "react-hot-toast";
import { Mail } from "lucide-react"; 

const VerifyEmailForm: React.FC = () => {
  return (
    <div className={"flex flex-col gap-6"}>
      <Toaster />
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            Email Verification
          </CardTitle>
          <CardDescription>
            A verification link has been sent to your inbox. Please click the link to log in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <Button
              className="w-full flex items-center justify-center gap-2"
              onClick={() => window.open("https://mail.google.com", "_blank")}
            >
              <Mail className="w-4 h-4" />
              Open Gmail
            </Button>
            <div className="text-center text-sm">
              <a href="/login" className="underline underline-offset-4">
                Go Back
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default VerifyEmailForm;
