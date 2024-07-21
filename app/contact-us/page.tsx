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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
          "Your message has been sent successfully. We'll get back to you soon!",
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
  };

  const closeAlert = () => {
    setAlert(null);
  };

  return (
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

      <AlertDialog open={alert !== null} onOpenChange={closeAlert}>
        <AlertDialogContent
          className={`${
            alert?.type === "success" ? "bg-green-100" : "bg-red-100"
          } border-2 ${
            alert?.type === "success" ? "border-green-500" : "border-red-500"
          }`}
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              {alert?.type === "success" ? (
                <Check className="h-6 w-6 text-green-500 mr-2" />
              ) : (
                <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
              )}
              {alert?.type === "success" ? "Success" : "Error"}
            </AlertDialogTitle>
            <AlertDialogDescription>{alert?.message}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={closeAlert}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Contact;
