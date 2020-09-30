import { firestore } from "firebase";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { firestore as db } from "../../firebase/firebase.utils";
import CurrentUserContext from "../../providers/current-user/current-user.provider";
import { CurrentUser } from "../../typescript-interfaces/current-user.interface";
import { Ticket } from "../../typescript-interfaces/ticket.interface";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ViewTickets = () => {
  let query = useQuery();
  let type = query.get("type");
  const [ticketsList, setTicketsList] = useState<Array<Ticket>>([]);

  const currentUser: CurrentUser = useContext(CurrentUserContext);

  useEffect(() => {
    console.log("Running useEffect");

    setTicketsList([]);
    switch (type) {
      case "all":
        db.collection("tickets")
          .orderBy("createdAt", "desc")
          .get()
          .then((querySnapshot: firestore.QuerySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log("Document data:", doc.data());
              const {
                title,
                description,
                imageUrl,
                priority,
                status,
                owner,
                assignee,
                createdAt,
              } = doc.data();
              const ticket = {
                id: doc.id,
                title,
                description,
                imageUrl,
                priority,
                status,
                owner,
                assignee,
                createdAt,
              };
              setTicketsList((prevState) => [...prevState, ticket]);
            });
          })
          .catch((error: firestore.FirestoreError) => {
            console.log("Error getting document:", error);
          });
        break;

      case "my":
        db.collection("tickets")
          .orderBy("createdAt", "desc")
          .get()
          .then((querySnapshot: firestore.QuerySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (doc.data().owner.id === currentUser.id) {
                console.log("Document data:", doc.data());
                const {
                  title,
                  description,
                  imageUrl,
                  priority,
                  status,
                  owner,
                  assignee,
                  createdAt,
                } = doc.data();
                const ticket = {
                  id: doc.id,
                  title,
                  description,
                  imageUrl,
                  priority,
                  status,
                  owner,
                  assignee,
                  createdAt,
                };
                setTicketsList((prevState) => [...prevState, ticket]);
              }
            });
          })
          .catch((error: firestore.FirestoreError) => {
            console.log("Error getting document:", error);
          });
        break;

      case "assigned-to-me":
        db.collection("tickets")
          .orderBy("createdAt", "desc")
          .get()
          .then((querySnapshot: firestore.QuerySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (
                doc.data().status !== "fixed" &&
                doc.data().assignee.id === currentUser.id
              ) {
                console.log("Document data:", doc.data());
                const {
                  title,
                  description,
                  imageUrl,
                  priority,
                  status,
                  owner,
                  assignee,
                  createdAt,
                } = doc.data();
                const ticket = {
                  id: doc.id,
                  title,
                  description,
                  imageUrl,
                  priority,
                  status,
                  owner,
                  assignee,
                  createdAt,
                };
                setTicketsList((prevState) => [...prevState, ticket]);
              }
            });
          })
          .catch((error: firestore.FirestoreError) => {
            console.log("Error getting document:", error);
          });
        break;

      case "unassigned":
        db.collection("tickets")
          .orderBy("createdAt", "desc")
          .get()
          .then((querySnapshot: firestore.QuerySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (doc.data().status === "unassigned") {
                console.log("Document data:", doc.data());
                const {
                  title,
                  description,
                  imageUrl,
                  priority,
                  status,
                  owner,
                  assignee,
                  createdAt,
                } = doc.data();
                const ticket = {
                  id: doc.id,
                  title,
                  description,
                  imageUrl,
                  priority,
                  status,
                  owner,
                  assignee,
                  createdAt,
                };
                setTicketsList((prevState) => [...prevState, ticket]);
              }
            });
          })
          .catch((error: firestore.FirestoreError) => {
            console.log("Error getting document:", error);
          });
        break;

      case "fixed":
        db.collection("tickets")
          .orderBy("createdAt", "desc")
          .get()
          .then((querySnapshot: firestore.QuerySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (doc.data().status === "fixed") {
                console.log("Document data:", doc.data());
                const {
                  title,
                  description,
                  imageUrl,
                  priority,
                  status,
                  owner,
                  assignee,
                  createdAt,
                } = doc.data();
                const ticket = {
                  id: doc.id,
                  title,
                  description,
                  imageUrl,
                  priority,
                  status,
                  owner,
                  assignee,
                  createdAt,
                };
                setTicketsList((prevState) => [...prevState, ticket]);
              }
            });
          })
          .catch((error: firestore.FirestoreError) => {
            console.log("Error getting document:", error);
          });
        break;

      case "failed":
        db.collection("tickets")
          .orderBy("createdAt", "desc")
          .get()
          .then((querySnapshot: firestore.QuerySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (doc.data().status === "failed") {
                console.log("Document data:", doc.data());
                const {
                  title,
                  description,
                  imageUrl,
                  priority,
                  status,
                  owner,
                  assignee,
                  createdAt,
                } = doc.data();
                const ticket = {
                  id: doc.id,
                  title,
                  description,
                  imageUrl,
                  priority,
                  status,
                  owner,
                  assignee,
                  createdAt,
                };
                setTicketsList((prevState) => [...prevState, ticket]);
              }
            });
          })
          .catch((error: firestore.FirestoreError) => {
            console.log("Error getting document:", error);
          });
        break;

      default:
        break;
    }
  }, [type, currentUser]);

  return (
    <div className="p-5">
      <h2 className={"text-center"}>View Tickets Here</h2>
      {ticketsList.length > 0 ? (
        <table className="table table-bordered table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">S.No.</th>
              <th scope="col">Issue Title</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {ticketsList.map((ticket, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <Link
                    className={"text-white"}
                    to={`/bugtrail-v2/ticket-details/${ticket.id}`}
                  >
                    {ticket.title}
                  </Link>
                </td>
                <td>{ticket.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3 className={"text-center pt-5"}>No tickets found</h3>
      )}
    </div>
  );
};

export default ViewTickets;