import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/selection");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/selection");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fbfbfd]">
      <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-3xl shadow-lg animate-fadeIn">
        <div className="text-center">
          <h2 className="text-4xl font-semibold text-[#1d1d1f] mb-2">SnapVault</h2>
          <p className="text-[#86868b] text-lg">
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
                  brand: '#06c',
                  brandAccent: '#007AFF',
                  brandButtonText: 'white',
                },
                borderWidths: {
                  buttonBorderWidth: '0px',
                  inputBorderWidth: '1px',
                },
                radii: {
                  borderRadiusButton: '12px',
                  buttonBorderRadius: '12px',
                  inputBorderRadius: '12px',
                },
              },
            },
            className: {
              button: 'bg-[#06c] hover:bg-[#007AFF] text-white rounded-xl px-6 py-3',
              input: 'rounded-xl border border-gray-200',
            },
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
          redirectTo="https://preview--snapvault-gallery.lovable.app/selection"
        />
      </div>
    </div>
  );
};

export default Login;