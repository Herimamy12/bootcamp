import { useState } from "react";

function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">⚙️ Settings</h1>
      
      <div className="card bg-base-100 shadow">
        <div className="card-body space-y-6">

          {/* Dark mode */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-semibold">Dark Mode</h2>
              <p className="text-sm backdrop-opacity-70">
                Enable Dark Mode.
              </p>
            </div>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              placeholder="Hello" // L'input demande de mette un placeholder
            />
          </div>

          {/* Notifications */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-semibold">Notifications email</h2>
              <p className="text-sm backdrop-opacity-70">
                Receive notifications
              </p>
            </div>
            <input
              type="checkbox"
              className="toggle toggle-secondary"
              checked={emailNotif}
              onChange={() => setEmailNotif(!emailNotif)}
              placeholder="Hello" // L'input demande de mette un placeholder
            />
          </div>

          <div className="divider"></div>

          <div className="btn btn-primary w-full">
            Save changes.
          </div>

        </div>
      </div>

    </div>
  );
}

export default Settings;
