import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { load } from "@cashfreepayments/cashfree-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Loader2, Ticket, User, Mail, Phone, GraduationCap, School, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type TicketType = "single" | "group2" | "group5";

const memberSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone must be 10 digits"),
  college: z.string().min(2, "College name is required").max(200),
  year: z.string().min(1, "Please select your year"),
});


const formSchema = z
  .object({
    ticketType: z.enum(["single", "group2", "group5"]),
    members: z.array(memberSchema).length(5),
  })
  .superRefine((data, ctx) => {
    const requiredMembers = TICKET_OPTIONS[data.ticketType].memberCount;

    for (let index = 0; index < requiredMembers; index += 1) {
      const member = data.members[index];
      if (!member.fullName || !member.email || !member.phone || !member.college || !member.year) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Please fill all fields for Member ${index + 1}`,
          path: ["members", index],
        });
      }
    }
  });

type FormData = z.infer<typeof formSchema>;

const colors = {
  primary: "#2A0640",
  secondary: "#BA6EEA",
  support: "#5E4271",
  background: "#12011D",
  highlight: "#F7EFF9",
} as const;

const TICKET_OPTIONS: Record<
  TicketType,
  {
    label: string;
    memberCount: number;
    basePrice: number;
  }
> = {
  single: { label: "Single Ticket", memberCount: 1, basePrice: 249 },
  group2: { label: "Group of two", memberCount: 2, basePrice: 478 },
  group5: { label: "Group of five", memberCount: 5, basePrice: 1095 },
};

const CONVENIENCE_RATE = 0.02;

const getPayableAmount = (ticketType: TicketType) => {
  const { basePrice } = TICKET_OPTIONS[ticketType];
  return Number((basePrice * (1 + CONVENIENCE_RATE)).toFixed(2));
};

const emptyMember = {
  fullName: "",
  email: "",
  phone: "",
  college: "",
  year: "",
};

const RegistrationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<FormData | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ticketType: "single",
      members: [emptyMember, emptyMember, emptyMember, emptyMember, emptyMember],
    },
  });

  const selectedTicketType = watch("ticketType");
  const requiredMembers = TICKET_OPTIONS[selectedTicketType].memberCount;

  const pricing = useMemo(() => {
    const selected = TICKET_OPTIONS[selectedTicketType];
    const convenienceFee = Number((selected.basePrice * CONVENIENCE_RATE).toFixed(2));
    const payableAmount = getPayableAmount(selectedTicketType);

    return {
      ...selected,
      convenienceFee,
      payableAmount,
    };
  }, [selectedTicketType]);

  const onSubmit = (data: FormData) => {
    setPendingFormData(data);
    setShowConfirmDialog(true);
  };

  const handleConfirmedSubmit = async () => {
    if (!pendingFormData) return;

    setShowConfirmDialog(false);
    setIsLoading(true);

    const data = pendingFormData;
    const members = data.members.slice(0, TICKET_OPTIONS[data.ticketType].memberCount);
    const leader = members[0];

    try {
      const payableAmount = getPayableAmount(data.ticketType);

      const { data: ticket, error } = await supabase
        .from("tickets")
        .insert({
          full_name: leader.fullName,
          email: leader.email,
          phone: leader.phone,
          college: leader.college,
          year: leader.year,
          ticket_type: data.ticketType,
          member_count: members.length,
          amount: payableAmount,
          members,
          status: "pending",
        })
        .select()
        .single();

      if (error) throw error;

      const { data: orderData, error: orderError } = await supabase.functions.invoke("create-cashfree-order", {
        body: {
          ticketId: ticket.id,
          fullName: leader.fullName,
          email: leader.email,
          phone: leader.phone,
          ticketType: data.ticketType,
          returnBaseUrl: window.location.origin,
        },
      });

      if (orderError) throw orderError;

      if (!orderData.success) {
        throw new Error(orderData.error || "Failed to create payment order");
      }

      const paymentSessionId = orderData.paymentSessionId as string | undefined;
      const environment = orderData.environment as string | undefined;

      if (!paymentSessionId) {
        throw new Error("Payment Session ID missing from Cashfree order response");
      }

      toast.success("Redirecting to payment...");

      const cashfree = await load({
        mode: environment === "production" ? "production" : "sandbox",
      });

      await cashfree.checkout({
        paymentSessionId,
        redirectTarget: "_self",
      });
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "Failed to register.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card
        className="max-w-3xl mx-auto backdrop-blur-xl border w-full"
        style={{
          background: "rgba(42, 6, 64, 0.68)",
          borderColor: "rgba(247, 239, 249, 0.16)",
        }}
      >
        <CardHeader className="text-center px-4 sm:px-6 pb-4">
          <div
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3"
            style={{ background: "rgba(186, 110, 234, 0.2)" }}
          >
            <Ticket className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: colors.secondary }} />
          </div>
          <CardTitle className="text-xl sm:text-2xl" style={{ color: colors.highlight }}>
            Register for E-Summit '26
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm" style={{ color: "rgba(247, 239, 249, 0.72)" }}>
            Select ticket type and fill details for every member
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-3">
              <Label className="flex items-center gap-2" style={{ color: colors.highlight }}>
                <Users className="w-4 h-4" /> Ticket Type
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {(Object.keys(TICKET_OPTIONS) as TicketType[]).map((type) => {
                  const option = TICKET_OPTIONS[type];
                  const selected = selectedTicketType === type;
                  return (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setValue("ticketType", type, { shouldValidate: true })}
                      className="text-left rounded-lg border p-3 transition-all"
                      style={{
                        background: selected ? "rgba(186, 110, 234, 0.24)" : "rgba(94, 66, 113, 0.35)",
                        borderColor: selected ? "rgba(186, 110, 234, 0.75)" : "rgba(247, 239, 249, 0.22)",
                        color: colors.highlight,
                      }}
                    >
                      <p className="font-semibold">{option.label}</p>
                      <p className="text-xs opacity-80">{option.memberCount} member(s)</p>
                      <p className="text-xs mt-1 opacity-85">₹{option.basePrice} + 2%</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              className="rounded-lg border p-4 text-sm"
              style={{
                background: "rgba(94, 66, 113, 0.28)",
                borderColor: "rgba(247, 239, 249, 0.22)",
                color: colors.highlight,
              }}
            >
              <p>
                <span className="font-semibold">{pricing.label}</span>: ₹{pricing.basePrice.toFixed(2)} + ₹
                {pricing.convenienceFee.toFixed(2)} (2%) = <span className="font-bold">₹{pricing.payableAmount.toFixed(2)}</span>
              </p>
            </div>

            {Array.from({ length: requiredMembers }).map((_, index) => (
              <div
                key={index}
                className="space-y-4 rounded-xl border p-4"
                style={{
                  background: "rgba(94, 66, 113, 0.22)",
                  borderColor: "rgba(247, 239, 249, 0.18)",
                }}
              >
                <h3 className="font-semibold" style={{ color: colors.highlight }}>
                  Member {index + 1} {index === 0 ? "(Primary Contact)" : ""}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2" style={{ color: colors.highlight }}>
                      <User className="w-4 h-4" /> Full Name
                    </Label>
                    <Input
                      {...register(`members.${index}.fullName`)}
                      style={{
                        background: "rgba(94, 66, 113, 0.38)",
                        borderColor: "rgba(247, 239, 249, 0.22)",
                        color: colors.highlight,
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2" style={{ color: colors.highlight }}>
                      <Mail className="w-4 h-4" /> Email
                    </Label>
                    <Input
                      type="email"
                      {...register(`members.${index}.email`)}
                      style={{
                        background: "rgba(94, 66, 113, 0.38)",
                        borderColor: "rgba(247, 239, 249, 0.22)",
                        color: colors.highlight,
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2" style={{ color: colors.highlight }}>
                      <Phone className="w-4 h-4" /> Phone Number
                    </Label>
                    <Input
                      {...register(`members.${index}.phone`)}
                      style={{
                        background: "rgba(94, 66, 113, 0.38)",
                        borderColor: "rgba(247, 239, 249, 0.22)",
                        color: colors.highlight,
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2" style={{ color: colors.highlight }}>
                      <School className="w-4 h-4" /> College Name
                    </Label>
                    <Input
                      {...register(`members.${index}.college`)}
                      style={{
                        background: "rgba(94, 66, 113, 0.38)",
                        borderColor: "rgba(247, 239, 249, 0.22)",
                        color: colors.highlight,
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2" style={{ color: colors.highlight }}>
                    <GraduationCap className="w-4 h-4" /> Year of Study
                  </Label>
                  <select
                    {...register(`members.${index}.year`)}
                    className="w-full h-10 rounded-md border px-3 text-sm"
                    style={{
                      background: "rgba(94, 66, 113, 0.38)",
                      borderColor: "rgba(247, 239, 249, 0.22)",
                      color: colors.highlight,
                    }}
                  >
                    <option value="">Select your year</option>
                    <option value="1">First Year</option>
                    <option value="2">Second Year</option>
                    <option value="3">Third Year</option>
                    <option value="4">Fourth Year</option>
                    <option value="pg">Post Graduate</option>
                  </select>
                </div>

                {errors.members?.[index] && (
                  <p className="text-sm" style={{ color: "#f87171" }}>
                    Please fill all valid details for Member {index + 1}
                  </p>
                )}
              </div>
            ))}

            <Button
              type="submit"
              className="w-full text-white font-bold transition-all hover:scale-[1.02]"
              disabled={isLoading}
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                boxShadow: "0 0 25px rgba(186, 110, 234, 0.35)",
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...
                </>
              ) : (
                <>
                  <Ticket className="w-4 h-4 mr-2" /> Pay ₹{pricing.payableAmount.toFixed(2)} & Get Ticket
                </>
              )}
            </Button>
            <p className="text-center text-sm" style={{ color: "rgba(247, 239, 249, 0.56)" }}>
              You will be redirected to Cashfree for secure payment
            </p>
          </form>
        </CardContent>
      </Card>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Please Verify Your Details</AlertDialogTitle>
            <AlertDialogDescription className="space-y-3 pt-2 text-left">
              <p>Tickets will be sent to primary member's email. Please double-check for accuracy.</p>
              <div className="p-3 bg-muted/50 rounded-md space-y-2 text-sm border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ticket Type:</span>
                  <span className="font-medium text-foreground">
                    {pendingFormData ? TICKET_OPTIONS[pendingFormData.ticketType].label : "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Primary Email:</span>
                  <span className="font-medium text-foreground">{pendingFormData?.members?.[0]?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Primary Phone:</span>
                  <span className="font-medium text-foreground">{pendingFormData?.members?.[0]?.phone}</span>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Edit</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmedSubmit}>Confirm & Pay</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RegistrationForm;
