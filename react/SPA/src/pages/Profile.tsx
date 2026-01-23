import { useParams } from "react-router-dom";

function Profile() {
  const { userId } = useParams<{ userId: string }>();

  return (
    <div className="p-8">
      <div className="card bg-base-100 shadow-xl max-w-xl mx-auto">
        <div className="card-body">
          <h1 className="card-title">Profile User</h1>
          <p>
            <span className="font-semibold">User ID :</span>
            {userId}
          </p>

          <div className="alert alert-info mt-4">
            <span>Parameter retrieved from the URL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
