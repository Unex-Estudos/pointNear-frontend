import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Business } from '../../types';

interface Props {
  address: Business['address'];
  coordinates: [number, number] | null;
}

export function BusinessLocationBlock({ address, coordinates }: Props) {
  return (
    <>
      <p className="font-medium text-charcoal mb-1 text-sm">
        {address.street}, {address.number}
      </p>
      <p className="text-charcoal-light text-sm mb-4">
        {address.neighborhood} - {address.city}, {address.state}
      </p>
      {coordinates ? (
        <>
          <div className="h-48 rounded-xl overflow-hidden mb-4 relative z-0">
            <MapContainer center={coordinates} zoom={15} scrollWheelZoom={false} className="w-full h-full">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={coordinates} />
            </MapContainer>
          </div>
          <a
            href={`https://maps.google.com/?q=${coordinates[0]},${coordinates[1]}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-moss-50 hover:bg-moss-100 text-moss-800 py-2.5 rounded-xl font-medium transition-colors text-sm">
            Como chegar
          </a>
        </>
      ) : (
        <div className="rounded-xl bg-moss-50 p-4 text-sm text-charcoal-light text-center">
          Mapa indisponível para este endereço.
        </div>
      )}
    </>
  );
}