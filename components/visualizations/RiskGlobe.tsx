
import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
// FIX: Import Feature type from geojson to resolve namespace error.
import type { Feature } from 'geojson';
import { GEO_RISK_DATA } from '../../constants';
import { RiskLevel, AIRiskDataPoint } from '../../types';

// Extend the Feature type from @types/geojson to include properties
interface CountryFeature extends Feature {
  properties: {
    name: string;
    iso_a3: string;
  };
}

interface RiskGlobeProps {
    riskPoints?: AIRiskDataPoint[];
}


const RiskGlobe: React.FC<RiskGlobeProps> = ({ riskPoints = [] }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const [worldData, setWorldData] = useState<any>(null);

    const riskColorMap: Record<RiskLevel, string> = {
        [RiskLevel.HIGH]: '#ef4444', // red-500
        [RiskLevel.MEDIUM]: '#f59e0b', // amber-500
        [RiskLevel.LOW]: '#10b981', // emerald-500
    };

    useEffect(() => {
        d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then(data => {
            setWorldData(data);
        });
    }, []);

    useEffect(() => {
        if (!worldData || !svgRef.current) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();
        
        const width = 500;
        const height = 500;

        const projection = d3.geoOrthographic()
            .scale(220)
            .translate([width / 2, height / 2])
            .rotate([-90, -25, 0])
            .clipAngle(90);

        const path = d3.geoPath().projection(projection);

        const land = topojson.feature(worldData, worldData.objects.countries);

        svg.append("path")
            .datum({ type: "Sphere" })
            .attr("d", path)
            .attr("fill", "#bfdbfe") // blue-200
            .attr("stroke", "#93c5fd") // blue-300
            .attr("stroke-width", 0.5);

        svg.selectAll(".country")
            .data((land as any).features)
            .enter().append("path")
            .attr("class", "country")
            .attr("d", path as any)
            .attr("fill", (d: any) => {
                const risk = GEO_RISK_DATA[(d as CountryFeature).properties.iso_a3];
                return risk ? riskColorMap[risk] : '#d1d5db'; // gray-300
            })
            .attr("stroke", "#f9fafb") // gray-50
            .attr("stroke-width", 0.2)
             .append("title")
            .text((d: any) => `${(d as CountryFeature).properties.name}: ${GEO_RISK_DATA[(d as CountryFeature).properties.iso_a3]?.toUpperCase() || 'N/A'}`);
        
        // Draw risk points and labels
        const riskMarkers = svg.append("g");
        const riskLabels = svg.append("g");
        
        riskMarkers.selectAll("circle")
            .data(riskPoints)
            .enter()
            .append("circle")
            .attr("cx", d => projection([d.lng, d.lat])?.[0] ?? -10)
            .attr("cy", d => projection([d.lng, d.lat])?.[1] ?? -10)
            .attr("r", d => (projection.scale() / 100) * (d.riskLevel === RiskLevel.HIGH ? 2.5 : 2))
            .attr("fill", d => riskColorMap[d.riskLevel])
            .attr("stroke", "white")
            .attr("stroke-width", 0.5)
            .attr("opacity", 0.8)
            .attr("class", d => d.riskLevel === RiskLevel.HIGH ? 'animate-pulse-fast' : '')
            .style("display", d => {
                const coords = [d.lng, d.lat] as [number, number];
                return d3.geoDistance(coords, projection.invert!([width / 2, height / 2])) > Math.PI / 2 ? 'none' : 'block';
             })
            .append("title")
            .text(d => `${d.location}: ${d.riskLevel.toUpperCase()} RISK`);

        riskLabels.selectAll("text")
            .data(riskPoints)
            .enter()
            .append("text")
            .attr("x", d => projection([d.lng, d.lat])?.[0] ? projection([d.lng, d.lat])![0] + 8 : -1000)
            .attr("y", d => projection([d.lng, d.lat])?.[1] ? projection([d.lng, d.lat])![1] + 4 : -1000)
            .text(d => d.location)
            .attr("fill", "#1f2937")
            .attr("font-weight", "600")
            .style("text-anchor", "start")
            .style("paint-order", "stroke")
            .attr("stroke", "rgba(255, 255, 255, 0.8)")
            .attr("stroke-width", "3px")
            .attr("stroke-linecap", "butt")
            .attr("stroke-linejoin", "miter")
            .attr("font-size", "10px")
            .style("display", d => {
                const coords = [d.lng, d.lat] as [number, number];
                return d3.geoDistance(coords, projection.invert!([width / 2, height / 2])) > Math.PI / 2 ? 'none' : 'block';
            });


        const drag = d3.drag<SVGSVGElement, unknown>()
            .on("start", (event) => {
                event.sourceEvent.stopPropagation();
            })
            .on("drag", (event) => {
                const rotate = projection.rotate();
                const k = 75 / projection.scale(); // Adjust sensitivity based on zoom
                projection.rotate([rotate[0] + event.dx * k, rotate[1] - event.dy * k]);
                svg.selectAll("path").attr("d", path as any);
                
                const currentRotation = projection.rotate();

                // Update risk point positions and visibility
                riskMarkers.selectAll("circle")
                    .attr("cx", d => projection([(d as AIRiskDataPoint).lng, (d as AIRiskDataPoint).lat])?.[0] ?? -10)
                    .attr("cy", d => projection([(d as AIRiskDataPoint).lng, (d as AIRiskDataPoint).lat])?.[1] ?? -10)
                    .style("display", d => {
                        const coords = [(d as AIRiskDataPoint).lng, (d as AIRiskDataPoint).lat] as [number, number];
                         return d3.geoDistance(coords, [-currentRotation[0], -currentRotation[1]]) > Math.PI / 2 ? 'none' : 'block';
                    });
                
                // Update label positions and visibility
                riskLabels.selectAll("text")
                    .attr("x", d => projection([(d as AIRiskDataPoint).lng, (d as AIRiskDataPoint).lat])?.[0] ? projection([(d as AIRiskDataPoint).lng, (d as AIRiskDataPoint).lat])![0] + 8 : -1000)
                    .attr("y", d => projection([(d as AIRiskDataPoint).lng, (d as AIRiskDataPoint).lat])?.[1] ? projection([(d as AIRiskDataPoint).lng, (d as AIRiskDataPoint).lat])![1] + 4 : -1000)
                    .style("display", d => {
                        const coords = [(d as AIRiskDataPoint).lng, (d as AIRiskDataPoint).lat] as [number, number];
                        return d3.geoDistance(coords, [-currentRotation[0], -currentRotation[1]]) > Math.PI / 2 ? 'none' : 'block';
                    });
            });
        
        const initialScale = projection.scale();
        const zoom = d3.zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.8, 10])
            .on('zoom', (event) => {
                projection.scale(initialScale * event.transform.k);
                svg.selectAll("path").attr("d", path as any);
                const currentScale = projection.scale();

                riskMarkers.selectAll("circle")
                    .attr("cx", d => projection([(d as AIRiskDataPoint).lng, (d as AIRiskDataPoint).lat])?.[0] ?? -10)
                    .attr("cy", d => projection([(d as AIRiskDataPoint).lng, (d as AIRiskDataPoint).lat])?.[1] ?? -10)
                    .attr("r", d => (currentScale / 100) * (d.riskLevel === RiskLevel.HIGH ? 2.5 : 2));

                riskLabels.selectAll("text")
                    .attr("x", d => projection([(d as AIRiskDataPoint).lng, (d as AIRiskDataPoint).lat])?.[0] ? projection([(d as AIRiskDataPoint).lng, (d as AIRiskDataPoint).lat])![0] + 8 : -1000)
                    .attr("y", d => projection([(d as AIRiskDataPoint).lng, (d as AIRiskDataPoint).lat])?.[1] ? projection([(d as AIRiskDataPoint).lng, (d as AIRiskDataPoint).lat])![1] + 4 : -1000)
                    .attr("font-size", `${Math.max(8, Math.min(12, currentScale / 25))}px`);
            });
        
        svg.call(drag as any).call(zoom as any);

    }, [worldData, riskPoints]);

    return (
        <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 500 500"></svg>
    );
};

export default RiskGlobe;
