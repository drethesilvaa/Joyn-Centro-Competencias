"use client";

import MarkdownRenderer from "@/components/MarkdownRenderer";
import { ProcessedEvent } from "@/types/events";
import { Button } from "antd";

import {
  Clock,
  MapPin,
  Users,
  VideoCamera,
  Link as LinkIcon,
} from "phosphor-react";

interface EventCardProps {
  event: ProcessedEvent;
  onSignUp: (event: ProcessedEvent) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onSignUp }) => {
  const spotsLeft = event.maxAttendees
    ? event.maxAttendees - event.attendeesCount
    : null;
  const isAlmostFull = spotsLeft !== null && spotsLeft <= 5;
  const isFull = spotsLeft !== null && spotsLeft <= 0;
  const enrollmentPercentage = event.maxAttendees
    ? (event.attendeesCount / event.maxAttendees) * 100
    : 0;

  const getImageSrc = (eventTitle: string) => {
    if (eventTitle.includes("Human Evolution")) {
      return "/Artigos/human-evolution.jpg";
    } else if (eventTitle.includes("CoE Data")) {
      return "/Artigos/ai-generated-9045622.jpg";
    } else if (eventTitle.includes("CoE .NET")) {
      return "/Artigos/dot_NET_services.png";
    } else if (eventTitle.includes("CoE Cloud Transformation") || eventTitle.includes("Coe Cloud Transformation")) {
      return "/Artigos/cloud-computing-3385323.jpg";
    } else {
      return "/eventos/event-image.jpg"; // Default image
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={getImageSrc(event.title)}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <span className="px-2 py-1 bg-secondary text-white text-xs font-medium rounded-full">
            {event.category}
          </span>
          {event.status === "tentative" && (
            <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-medium rounded-full">
              Tentativo
            </span>
          )}
          {event.isRecurring && (
            <span className="px-2 py-1 bg-purple-500 text-white text-xs font-medium rounded-full">
              Recorrente
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 ">{event.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          <MarkdownRenderer content={event.description} />
        </p>

        <div className="space-y-2 mb-4">
          {!event.isAllDay && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock size={16} />
              <span>
                {event.startTime} - {event.endTime}
              </span>
            </div>
          )}
          {event.isAllDay && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock size={16} />
              <span>Evento de dia inteiro</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-gray-500">
            {event.hasVideoConference ? (
              <VideoCamera size={16} />
            ) : (
              <MapPin size={16} />
            )}
            <span>{event.location}</span>
            {event.hasVideoConference && event.videoConferenceLink && (
              <a
                href={event.videoConferenceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                <LinkIcon size={16} />
              </a>
            )}
          </div>

          {/* <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Users size={16} />
                        <span>
                            {event.attendeesCount}
                            {event.maxAttendees ? `/${event.maxAttendees}` : ''}
                            {event.maxAttendees ? ' inscritos' : ' participantes'}
                        </span>
                        {isAlmostFull && !isFull && (
                            <span className="text-orange-500 font-medium">
                                ({spotsLeft} vagas restantes)
                            </span>
                        )}
                    </div> */}

          <div className="text-xs text-gray-400">
            Organizado por: {event.organizer}
          </div>
        </div>

        {event.maxAttendees && (
          <div className="flex justify-between items-center mb-3">
            <div className="flex-1 mr-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isFull
                      ? "bg-red-500"
                      : isAlmostFull
                      ? "bg-orange-500"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${Math.min(enrollmentPercentage, 100)}%` }}
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <a
            href={event.htmlLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent text-sm font-medium"
          >
            Ver no Google Calendar
          </a>

          {/* <Button
                        onClick={() => onSignUp(event)}
                        disabled={isFull}
                        type="primary"
                    >
                        {isFull ? 'Lotado' : 'Inscrever-se'}
                    </Button> */}
        </div>
      </div>
    </div>
  );
};
