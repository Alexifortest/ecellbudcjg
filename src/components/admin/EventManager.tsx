import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import EventForm from "./EventForm";
import { PencilLine, Trash2 } from "lucide-react";

type Event = {
  id: string;
  title: string;
  description: string;
  venue: string;
  start_date: string;
  event_type: string;
  status: string;
};

const EventManager = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<any>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("start_date", { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setEvents(data || []);
  }
async function deleteEvent(id: string) {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this event?"
  );

  if (!confirmDelete) return;

  const { error } = await supabase
    .from("events")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    alert("Error deleting event");
    return;
  }

  alert("Event deleted successfully");

  fetchEvents();
}
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Events Manager</h2>
        <EventForm onAdded={fetchEvents}
        editingEvent={editingEvent} />
      <table className="w-full border rounded-lg overflow-hidden">
        <thead className="bg-muted">
          <tr>
            <th className="text-left p-3">Title</th>
            <th className="text-left p-3">Date</th>
            <th className="text-left p-3">Venue</th>
            <th className="text-left p-3">Type</th>
            <th className="text-left p-3">Status</th>
            <th className="text-left p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="border-t">
              <td className="p-3">{event.title}</td>
              <td className="p-3">{event.start_date}</td>
              <td className="p-3">{event.venue}</td>
              <td className="p-3">{event.event_type}</td>
              <td className="p-3">{event.status}</td>
              <td className="p-3 flex gap-3">

  <button
  onClick={() => setEditingEvent(event)}
  className="text-blue-500 hover:text-blue-700"
  title="Edit"
>
  <PencilLine size={18} />
</button>

 <button
  onClick={() => deleteEvent(event.id)}
  className="text-red-500 hover:text-red-700"
  title="Delete"
>
  <Trash2 size={18} />
</button>

</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



export default EventManager;