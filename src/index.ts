// src/index.ts
import * as d3 from 'd3';


export function initAstroViz(divId: string, houseData: string[]): d3.Selection<SVGSVGElement, unknown, HTMLElement, any> {
    const svgWidth = 550;
    const svgHeight = 410;
    const houseWidth = 131.25;
    const houseHeight = 96.25;
    const margin = 8;

    const HouseArrayMap: { [key: number]: number } = {
        0: 1,
        1: 2,
        2: 3,
        3: 5,
        4: 7,
        5: 11,
        6: 10,
        7: 9,
        8: 8,
        9: 6,
        10: 4,
        11: 0
    }

    // Select the div with id "southChart"
    const chartContainer = d3.select(divId);

    // Append an SVG to the div
    const svg = chartContainer.append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    // Background rectangle
    svg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .attr("class", "chart");

    // Title text
    svg.append("text")
        .attr("x", svgWidth / 2.1)
        .attr("y", 180)
        .attr("class", "title")
        .append("tspan").text("Rasi")

    // Calculate x and y positions for houses with margins
    const _houseDataBox = [
        { x: 0, y: 0 },
        { x: (1 * houseWidth) + margin, y: 0 },
        { x: (2 * houseWidth) + 2 * margin, y: 0 },
        { x: (3 * houseWidth) + 3 * margin, y: 0 },
        { x: 0, y: (1 * houseHeight) + margin },
        { x: (3 * houseWidth) + 3 * margin, y: (1 * houseHeight) + margin },
        { x: 0, y: (2 * houseHeight) + 2 * margin },
        { x: (3 * houseWidth) + 3 * margin, y: (2 * houseHeight) + 2 * margin },
        { x: 0, y: (3 * houseHeight) + 3 * margin },
        { x: (1 * houseWidth) + margin, y: (3 * houseHeight) + 3 * margin },
        { x: (2 * houseWidth) + 2 * margin, y: (3 * houseHeight) + 3 * margin },
        { x: (3 * houseWidth) + 3 * margin, y: (3 * houseHeight) + 3 * margin },
    ];

    // Houses
    svg.selectAll("rect.house")
        .data(_houseDataBox)
        .enter().append("rect")
        .attr("x", d => d.x)
        .attr("y", d => d.y)
        .attr("width", houseWidth)
        .attr("height", houseHeight)
        .attr("class", "house")

    // House labels
    const isValid = houseData.length <= 12
    if (!isValid) {
        throw new Error("The data length must be 12");
    }

    houseData.forEach((label, i: number) => {
        let val: number = HouseArrayMap[i]
        svg.append("text")
            .attr("x", _houseDataBox[val].x + 0.5 * houseWidth)
            .attr("y", _houseDataBox[val].y + 0.5 * houseHeight)
            .attr("class", "houseText")
            .text(label as string);
    });
    // svg.selectAll("text.houseText")
    //     .data(houseData)
    //     .enter().append("text")
    //     .attr("x", (d, i) => _houseDataBox[i].x + 0.5 * houseWidth)
    //     .attr("y", (d, i) => _houseDataBox[i].y + 0.5 * houseHeight)
    //     .attr("class", "houseText")
    //     .text(d => d as string);


    return svg;
}
