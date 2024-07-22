"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Check, AlertCircle } from "lucide-react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      // Here you would typically send the form data to your backend
      console.log("Form submitted:", { name, email, message });
      setAlert({
        type: "success",
        message:
          "We recieved your message successfully. We'll get back to you soon!",
      });
      // Reset form fields
      setName("");
      setEmail("");
      setMessage("");
    } else {
      setAlert({
        type: "error",
        message: "Please fill in all fields before submitting.",
      });
    }

    // Hide alert after 5 seconds
    setTimeout(() => setAlert(null), 2000);
  };

  return (
    <>
      {alert && (
        <Alert
          className={`mt-4 max-w-2xl mx-auto ${
            alert.type === "error"
              ? "bg-red-100 border-red-400 text-red-700"
              : "bg-green-100 border-green-400 text-green-700"
          }`}
        >
          {alert.type === "success" ? (
            <Check className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertTitle>
            {alert.type === "success" ? "Success" : "Error"}
          </AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}
      <div className="mx-auto flex flex-col items-center justify-center p-40">
        <Card className="mx-auto max-w-xl">
          <CardHeader>
            <CardTitle className="text-xl">Contact Us</CardTitle>
            <CardDescription>
              Enter your information to contact us and we will get back to you
              soon!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">Name</Label>
                  <Input
                    id="first-name"
                    placeholder="Max"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Textarea
                    rows={1}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Contact;
