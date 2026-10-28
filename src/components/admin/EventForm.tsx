import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const EventForm = ({
  onAdded,
  editingEvent,
}: {
  onAdded: () => void;
  editingEvent: any;
}) => {


  const [form, setForm] = useState({
    title: "",
    description: "",
    venue: "",
    start_date: "",
    end_date: "",
    event_type: "",
    banner_image: "",
    registration_link: "",
    status: "draft",
    is_featured: false,
  });
useEffect(() => {
  if (editingEvent) {
    setForm({
      title: editingEvent.title || "",
      description: editingEvent.description || "",
      venue: editingEvent.venue || "",
      start_date: editingEvent.start_date || "",
      end_date: editingEvent.end_date || "",
      event_type: editingEvent.event_type || "",
      banner_image: editingEvent.banner_image || "",
      registration_link: editingEvent.registration_link || "",
      status: editingEvent.status || "draft",
      is_featured: editingEvent.is_featured || false,
    });
  }
}, [editingEvent]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };


  async function addEvent() {

    const { error } = await supabase
      .from("events")
      .insert(form);

    if (error) {
      console.error(error);
      alert("Error adding event");
      return;
    }

    alert("Event added successfully");

    setForm({
      title: "",
      description: "",
      venue: "",
      start_date: "",
      end_date: "",
      event_type: "",
      banner_image: "",
      registration_link: "",
      status: "draft",
      is_featured: false,
    });

    onAdded();
  }


  return (
    <div className="border rounded-xl p-6 mb-8 bg-card">

      <h2 className="text-xl font-semibold mb-5 text-foreground">
        Add New Event
    </h2>


      <div className="grid gap-4">

        <input
          name="title"
          placeholder="Event Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 rounded-lg text-black bg-white text-sm"
        />


        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded-lg text-black bg-white text-sm min-h-24"
        />


        <input
          name="venue"
          placeholder="Venue"
          value={form.venue}
          onChange={handleChange}
          className="border p-2 rounded-lg text-black bg-white text-sm"
        />


        <input
          type="date"
          name="start_date"
          value={form.start_date}
          onChange={handleChange}
          className="border p-2 rounded-lg text-black bg-white text-sm"
        />


        <input
          type="date"
          name="end_date"
          value={form.end_date}
          onChange={handleChange}
          className="border p-2 rounded-lg text-black bg-white text-sm"
        />


        <input
          name="event_type"
          placeholder="Event Type"
          value={form.event_type}
          onChange={handleChange}
          className="border p-2 rounded-lg text-black bg-white text-sm"
        />


        <input
          name="banner_image"
          placeholder="Banner Image URL"
          value={form.banner_image}
          onChange={handleChange}
          className="border p-2 rounded-lg text-black bg-white text-sm"
        />


        <input
          name="registration_link"
          placeholder="Registration Link"
          value={form.registration_link}
          onChange={handleChange}
          className="border p-2 rounded-lg text-black bg-white text-sm"
        />


        <button
          onClick={addEvent}
          className="bg-primary text-white rounded-lg py-2 px-5 text-sm font-medium hover:opacity-90"
        >
          Save Event
        </button>

      </div>

    </div>
  );
};

export default EventForm;