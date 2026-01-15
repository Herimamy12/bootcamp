interface SearchBarProps {
    value: string;
    onChange: (newValue: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <input
            type="text"
            placeholder="Rechercher des images..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            // className="input input-bordered w-full max-w-xs"
        />
    );
}