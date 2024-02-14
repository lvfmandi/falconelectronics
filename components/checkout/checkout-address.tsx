"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import _ from "lodash";

// data
import { CountiesData } from "@/app/checkout/page";

// comopnents
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "../ui/checkbox";
import { toast } from "../ui/use-toast";
import { useCart } from "react-use-cart";

const FormSchema = z.object({
  email: z.string().email({
    message: "Email must be an actual email",
  }),
  firstName: z.string().min(2, {
    message: "First Name must be more than two letters",
  }),
  lastName: z.string().min(2, {
    message: "Last Name must be more than two letters",
  }),
  county: z
    .string({
      required_error: "The county has to be selected",
    })
    .min(1)
    .max(47),
  constituency: z
    .string({
      required_error: "The constituency has to be selected",
    })
    .min(1)
    .max(47),
  ward: z
    .string({
      required_error: "The ward has to be selected",
    })
    .min(1)
    .max(47),
  streetAddress: z
    .string({
      required_error: "The street address has to be added",
    })
    .min(3, {
      message: "The street address must be more than 3 characters",
    }),
  telephone: z
    .string({ required_error: "You must add a telephone number" })
    .min(10, {
      message:
        "The phone number has to start with a 0 and have 10 total digits",
    }),
  remember: z.boolean().default(true).optional(),
});

type CheckoutAddressProps = {
  locationData: CountiesData;
};

function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function CheckoutAddress({ locationData }: CheckoutAddressProps) {
  const cart = useCart();
  const [selectedUser, setSelectedUser] = useState<z.infer<
    typeof FormSchema
  > | null>(null);
  const [users, setUsers] = useState<z.infer<typeof FormSchema>[] | []>([]);
  const [payment, setPayment] = useState<string | null>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      county: "",
      constituency: "",
      ward: "",
      streetAddress: "",
      telephone: "",
      remember: true,
    },
  });

  function removeUser() {
    const newUserList = users.filter((user) => !_.isEqual(user, selectedUser));
    localStorage.setItem("users", JSON.stringify(newUserList));
    setUsers(newUserList);
    setSelectedUser(null);
  }

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(() => {
        const parsedUsers = JSON.parse(storedUsers);
        setSelectedUser(
          parsedUsers[parsedUsers.length - 1] as z.infer<typeof FormSchema>
        );
        return parsedUsers;
      });
    }
  }, []);

  useEffect(() => {
    if (selectedUser) {
      form.setValue("email", selectedUser.email);
      form.setValue("firstName", selectedUser.firstName);
      form.setValue("lastName", selectedUser.lastName);
      form.setValue("county", selectedUser.county);
      form.setValue("constituency", selectedUser.constituency);
      form.setValue("ward", selectedUser.ward);
      form.setValue("streetAddress", selectedUser.streetAddress);
      form.setValue("telephone", selectedUser.telephone);
      form.setValue("remember", selectedUser.remember);
    }
  }, [selectedUser]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const remember = form.getValues("remember");
    setSelectedUser(() => data);

    if (remember && !users.find((item) => _.isEqual(item, data))) {
      toast({
        title: "User added",
        description: `The user: ${data.firstName} ${data.lastName} has been saved`,
      });
      const newUsers = [...users, data];
      setUsers(() => newUsers);
      localStorage.setItem("users", JSON.stringify(newUsers));
    }

    // send data to the server
    const checkout: any = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({ data: { ...data, cart } }),
    });

    const responseData = await checkout.json();
    ({ responseData, checkout });
    if (checkout.status === 200) {
      setPayment(responseData.redirect_url);
      toast({
        title: "Payment Inititated",
        description: "A payment has been initiated",
      });
    } else {
      toast({
        title: "Error",
        description: "An error occured on the server, please contact our admin",
        variant: "destructive",
      });
    }
  }

  return (
    <main>
      {payment ? (
        <div className="h-[100vh]">
          <iframe
            src={payment}
            width={"100%"}
            height={"100%"}
            className="border-0"
          />
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Dropdown or list to select a user */}
            {users.length ? (
              <Select
                value={selectedUser ? JSON.stringify(selectedUser) : "null"}
                onValueChange={(value) => {
                  setSelectedUser(
                    value === "null" || !value
                      ? null
                      : (JSON.parse(value) as unknown as z.infer<
                          typeof FormSchema
                        >)
                  );
                }}
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Select a User or Form to proceed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Users</SelectLabel>
                    <SelectItem value={"null"} key="form">
                      Form
                    </SelectItem>
                    {users.map((user: any, index: number) => (
                      <SelectItem value={JSON.stringify(user)} key={index}>
                        {user.firstName} {user.lastName}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <></>
            )}
            {!selectedUser ? (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="janedoe@email.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid lg:grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John/Jane" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="county"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>County</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a county" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {locationData.map((county) => {
                            return (
                              <SelectItem value={county.name} key={county.name}>
                                {county.name}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        You must select the county first before constituency and
                        ward
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid lg:grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="constituency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Constituency</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a constituency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {form.watch("county") ? (
                              locationData
                                .find(
                                  (county) =>
                                    county.name === form.watch("county")
                                )
                                ?.constituencies.map((constituency) => (
                                  <SelectItem
                                    value={constituency.name}
                                    key={constituency.name}
                                  >
                                    {capitalizeFirstLetter(constituency.name)}
                                  </SelectItem>
                                ))
                            ) : (
                              <SelectItem disabled value="null">
                                Select a county first
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          You must select the constituency first before
                          selecting the ward
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ward"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ward</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a ward" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {form.watch("constituency") ? (
                              locationData
                                .find(
                                  (county) =>
                                    county.name === form.watch("county")
                                )
                                ?.constituencies.find(
                                  (constituency) =>
                                    constituency.name ===
                                    form.watch("constituency")
                                )
                                ?.wards.map((ward) => (
                                  <SelectItem value={ward} key={ward}>
                                    {capitalizeFirstLetter(ward)}
                                  </SelectItem>
                                ))
                            ) : (
                              <SelectItem disabled value="null">
                                Select a county and constituency first
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          You must select the constituency first before
                          selecting the ward
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="streetAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Arbor Drive Gate/ Phase 2 / Malewa Road"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Provide as much description as possible
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="telephone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="0712345678" {...field} />
                      </FormControl>
                      <FormDescription>
                        For calling you to confirm order and address
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken
                 */}
                <FormField
                  control={form.control}
                  name="remember"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Remember Me</FormLabel>
                        <FormDescription>
                          Choose this option to autofill your data next time.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <Button variant={"secondary"} onClick={removeUser} type="button">
                Forget {selectedUser.firstName} {selectedUser.lastName}
              </Button>
            )}
            <Button type="submit" className="w-full">
              Continue to Payment
            </Button>
          </form>
        </Form>
      )}
    </main>
  );
}
