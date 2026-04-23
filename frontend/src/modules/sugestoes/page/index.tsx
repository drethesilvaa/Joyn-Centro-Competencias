"use client";

import { PagesLayout } from "@/layouts/PagesLayout";
import { Form, Radio, Input, Button } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const { TextArea } = Input;

const pageSugestoes = {
  pageTitle: "Sugestões",
  pageDescription: "",
  videoUrl: "https://www.youtube.com/watch?v=example-video-id",
  imageToSwapForVideo: "/politicas/pexels-olly-3760067.jpg",
  imageAlt: "alt",
};

export const SugestoesPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const onFinish = async (values: { type: string; message: string }) => {
    setLoading(true);
    try {
      // Add user data with fallback for testing
      const payload = {
        ...values,
        userEmail: session?.user?.email || "test@test.com",
        userName: session?.user?.name || "Test User",
      };

      const response = await fetch("/api/sugestoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to send");
      }

      toast.success("Enviado com sucesso!");
      form.resetFields();
    } catch (error) {
      toast.error("Erro ao enviar. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PagesLayout
      pageTitle={pageSugestoes?.pageTitle || ""}
      pageDescription={""}
      pageImage={pageSugestoes?.imageToSwapForVideo || ""}
      pageImageAlt={pageSugestoes?.imageAlt || ""}
      formPage={true}
    >
      <div className="max-w-3xl mx-auto p-6">
        <h3 className="text-xl font-semibold">Inspirational text to make people write</h3>
        <Form
          className="mt-4"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ type: "suggestion" }}
        >
          <Form.Item
            label={<span className="text-base font-semibold">Tipo</span>}
            name="type"
            rules={[
              { required: true, message: "Por favor, selecione uma opção" },
            ]}
          >
            <Radio.Group>
              <Radio value="suggestion">Sugestão</Radio>
              <Radio value="feedback">Feedback</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label={<span className="text-base font-semibold">Mensagem</span>}
            name="message"
            rules={[
              { required: true, message: "Por favor, preencha a mensagem" },
            ]}
          >
            <TextArea
              rows={10}
              placeholder="Digite aqui a sua sugestão ou feedback..."
              style={{
                backgroundColor: "white",
                resize: "vertical",
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
            >
              Enviar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </PagesLayout>
  );
};
