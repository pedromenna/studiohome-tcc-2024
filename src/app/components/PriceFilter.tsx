import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface PriceFilterProps {
    onFilter: (minPrice: number, maxPrice: number) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ onFilter }) => {
    const [range, setRange] = useState<[number, number]>([0, 1000]);
    const [tempRange, setTempRange] = useState<[number, number]>([0, 1000]);

    const handleRangeChange = (values: [number, number]) => {
        setTempRange(values);
    };

    const handleAfterChange = (values: [number, number]) => {
        setRange(values);
    };

    const handleFilter = () => {
        onFilter(range[0], range[1]);
    };

    return (
        <div className="p-4 w-full max-w-lg">
            <h2 className="font-bold mb-4">Preço</h2>
            <div className="relative flex items-center w-full">
                <div className="w-full mr-4"> {/* Certifique-se que o slider ocupa a largura total */}
                    <Slider
                        range
                        min={0}
                        max={1000}
                        value={tempRange}
                        onChange={(values) => handleRangeChange(values as [number, number])}
                        onAfterChange={(values) => handleAfterChange(values as [number, number])}
                        trackStyle={[{ backgroundColor: '#007bff', height: 4 }]} // Azul para track
                        handleStyle={[
                            { borderColor: '#007bff', backgroundColor: '#007bff', height: 24, width: 24, marginLeft: -12, marginTop: -10 },
                            { borderColor: '#007bff', backgroundColor: '#007bff', height: 24, width: 24, marginLeft: -12, marginTop: -10 },
                        ]}
                        railStyle={{ backgroundColor: '#e3e3e3', height: 4 }}
                    />
                </div>
                <button
                    onClick={handleFilter}
                    className="p-2 rounded border"
                    style={{ backgroundColor: 'white', color: 'black', borderColor: 'black', borderWidth: '1px' }} // Traçado preto
                >
                    Ir
                </button>
            </div>
            <div className="flex justify-between text-sm mt-4">
                <span>R$ {tempRange[0]}</span>
                <span>R$ {tempRange[1]}</span>
            </div>
        </div>
    );
};

export default PriceFilter;
