import { Await, defer, json, redirect, useRouteLoaderData } from "react-router-dom"
import { Suspense } from "react";

import EventItem from "../components/EventItem"
import EventsList from "../components/EventsList";

export default function EventDetails() {
    const { event, events } = useRouteLoaderData("event-details");

    return (
        <>
            <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
                <Await resolve={event}>
                    {(loadedEvent) => <EventItem event={loadedEvent} />}
                </Await>
            </Suspense>

            <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
                <Await resolve={events}>
                    {(loadedEvent) => <EventsList events={loadedEvent} />}
                </Await>
            </Suspense>

        </>
    )
}

async function loadEvent(id) {
    const response = await fetch("http://localhost:8080/events/" + id);

    if (!response.ok) {
        throw json(
            { msg: "Could not fetch details for the selected event" },
            { status: 500 }
        )
    } else {
        const resData = await response.json();
        return resData.event;
    }
}

async function loadEvents() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        return json(
            { msg: "Could not fetch events" },
            { status: 500, })
    } else {
        const resData = await response.json();
        return resData.events;
    }
}

export async function loader({ request, params }) {
    const id = params.id;

    return defer({
        event: await loadEvent(id),
        events: loadEvents(),
    })
}

export async function action({ params, request }) {
    const id = params.id;
    const response = await fetch("http://localhost:8080/events/" + id, {
        method: request.method,
    });

    if (!response.ok) {
        throw json(
            { msg: "Could not delete event" },
            { status: 500 }
        );
    }
    return redirect("/events");
}