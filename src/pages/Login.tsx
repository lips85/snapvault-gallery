import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/selection");
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8 bg-card rounded-lg shadow-lg animate-fadeIn">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground">SnapVault</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            현장 사진을 관리하세요
          </p>
        </div>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#000000',
                  brandAccent: '#333333',
                }
              }
            }
          }}
          providers={["google", "github"]}
          localization={{
            variables: {
              sign_up: {
                email_label: '이메일',
                password_label: '비밀번호',
                button_label: '회원가입',
                link_text: '계정이 없으신가요? 회원가입하기',
                confirmation_text: '이메일을 확인해주세요',
              },
              sign_in: {
                email_label: '이메일',
                password_label: '비밀번호',
                button_label: '로그인',
                link_text: '이미 계정이 있으신가요? 로그인하기',
              },
            },
          }}
          view="sign_in"
          showLinks={true}
        />
      </div>
    </div>
  );
};

export default Login;