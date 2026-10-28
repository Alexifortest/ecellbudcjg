import EventManager from "@/components/admin/EventManager";
import Sidebar from "@/components/admin/Sidebar";


const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 p-10">
        <h1 className="text-4xl font-bold mb-3">
          <EventManager />
        </h1>

        <p className="text-muted-foreground mb-10">
          Welcome to the E-Cell Admin Panel
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="rounded-xl border p-6">
            <h2 className="text-lg font-semibold">Events</h2>
            <p className="text-3xl font-bold mt-4">0</p>
          </div>

          <div className="rounded-xl border p-6">
            <h2 className="text-lg font-semibold">Blogs</h2>
            <p className="text-3xl font-bold mt-4">0</p>
          </div>

          <div className="rounded-xl border p-6">
            <h2 className="text-lg font-semibold">Team Members</h2>
            <p className="text-3xl font-bold mt-4">0</p>
          </div>

          <div className="rounded-xl border p-6">
            <h2 className="text-lg font-semibold">Gallery Images</h2>
            <p className="text-3xl font-bold mt-4">0</p>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;