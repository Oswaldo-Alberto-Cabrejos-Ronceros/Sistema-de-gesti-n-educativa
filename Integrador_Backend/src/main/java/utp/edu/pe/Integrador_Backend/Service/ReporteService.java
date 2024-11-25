package utp.edu.pe.Integrador_Backend.Service;


import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utp.edu.pe.Integrador_Backend.Entidades.Alumno;
import utp.edu.pe.Integrador_Backend.Entidades.AsignacionProfesor;
import utp.edu.pe.Integrador_Backend.Entidades.Nivel;
import utp.edu.pe.Integrador_Backend.Entidades.Subcurso;
import utp.edu.pe.Integrador_Backend.Repository.AsignacionProfesorRepository;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Service
public class ReporteService {

    @Autowired
    private AlumnoService alumnoService;

    @Autowired
    private NotaService notaService;

    @Autowired
    private SubcursoService subcursoService;

    @Autowired
    private AsignacionProfesorRepository asignacionProfesorRepository;

    public void generarReporteNotasPorSubcursoYUnidad(Nivel nivel, Integer grado, Long subcursoId, Integer unidad, OutputStream outputStream) throws IOException {

        // Crear el workbook
        Workbook workbook = new XSSFWorkbook();

        // Obtener la lista de alumnos por grado y subcurso
        List<Alumno> alumnos = alumnoService.obtenerAlumnosPorGradoYSubcurso(grado, subcursoId);

        if (alumnos.isEmpty()) {
            throw new RuntimeException("No hay alumnos en este grado, nivel y subcurso");
        }

        // Obtener información del subcurso
        Subcurso subcurso = subcursoService.obtenerSubcursoPorId(subcursoId);

        // Obtener el profesor asignado al subcurso
        Optional<AsignacionProfesor> asignacionProfesorOpt = asignacionProfesorRepository.findBySubcurso_SubcursoId(subcursoId);
        String nombreProfesor = asignacionProfesorOpt
                .map(asignacion -> asignacion.getProfesor().getNombre() + " " + asignacion.getProfesor().getApellido())
                .orElse("Sin profesor asignado");


        // Crear una hoja para el subcurso y unidad
        String nombreHoja = "Grado " + grado + " - " + nivel.name() + " - " + subcurso.getNombre() + " - Unidad " + unidad;
        Sheet sheet = workbook.createSheet(nombreHoja);

        //definimos estilos
        //cellStyles
        CellStyle titleStyle = workbook.createCellStyle();
        CellStyle headerStyle = workbook.createCellStyle();
        CellStyle headerDatosStyle = workbook.createCellStyle();
        CellStyle datosStyle = workbook.createCellStyle();
        XSSFCellStyle titlePromedioStyle = (XSSFCellStyle) workbook.createCellStyle();
        XSSFCellStyle  promedioStyle =(XSSFCellStyle) workbook.createCellStyle();

        //definimos un color personalizado para las celdas de promedio
        byte[] rgbColor = new byte[] {(byte) 245, (byte) 229, (byte) 35};
        XSSFColor promedioColorBG = new XSSFColor(rgbColor,null);

        //generamos y aplicamos fonts
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerFont.setFontHeightInPoints((short) 12);
        headerStyle.setFont(headerFont);

        Font titleFont = workbook.createFont();
        titleFont.setBold(true);
        titleFont.setFontHeightInPoints((short) 24);
        titleFont.setColor(IndexedColors.RED.getIndex());
        titleStyle.setFont(titleFont);

        Font datoFont = workbook.createFont();
        datoFont.setFontHeightInPoints((short) 12);
        datosStyle.setFont(datoFont);

        //aplicamos el font para el headerDatos
        headerDatosStyle.setFont(headerFont);
        //aplicamos el font para promedioStyle
        promedioStyle.setFont(datoFont);
        //aplicamos el font para el titlePromedioStyle
        titlePromedioStyle.setFont(headerFont);

        //estilos de bordes

        datosStyle.setBorderBottom(BorderStyle.THIN);
        datosStyle.setBorderLeft(BorderStyle.THIN);
        datosStyle.setBorderRight(BorderStyle.THIN);
        datosStyle.setBorderTop(BorderStyle.THIN);
        datosStyle.setTopBorderColor(IndexedColors.BLUE_GREY.getIndex());
        datosStyle.setBottomBorderColor(IndexedColors.BLUE_GREY.getIndex());
        datosStyle.setLeftBorderColor(IndexedColors.BLUE_GREY.getIndex());
        datosStyle.setRightBorderColor(IndexedColors.BLUE_GREY.getIndex());

        headerDatosStyle.setBorderBottom(BorderStyle.THIN);
        headerDatosStyle.setBorderLeft(BorderStyle.THIN);
        headerDatosStyle.setBorderRight(BorderStyle.THIN);
        headerDatosStyle.setBorderTop(BorderStyle.THIN);
        headerDatosStyle.setTopBorderColor(IndexedColors.BLUE_GREY.getIndex());
        headerDatosStyle.setBottomBorderColor(IndexedColors.BLUE_GREY.getIndex());
        headerDatosStyle.setLeftBorderColor(IndexedColors.BLUE_GREY.getIndex());
        headerDatosStyle.setRightBorderColor(IndexedColors.BLUE_GREY.getIndex());

        promedioStyle.setBorderBottom(BorderStyle.THIN);
        promedioStyle.setBorderLeft(BorderStyle.THIN);
        promedioStyle.setBorderRight(BorderStyle.THIN);
        promedioStyle.setBorderTop(BorderStyle.THIN);
        promedioStyle.setTopBorderColor(IndexedColors.BLUE_GREY.getIndex());
        promedioStyle.setBottomBorderColor(IndexedColors.BLUE_GREY.getIndex());
        promedioStyle.setLeftBorderColor(IndexedColors.BLUE_GREY.getIndex());
        promedioStyle.setRightBorderColor(IndexedColors.BLUE_GREY.getIndex());

        titlePromedioStyle.setBorderBottom(BorderStyle.THIN);
        titlePromedioStyle.setBorderLeft(BorderStyle.THIN);
        titlePromedioStyle.setBorderRight(BorderStyle.THIN);
        titlePromedioStyle.setBorderTop(BorderStyle.THIN);
        titlePromedioStyle.setTopBorderColor(IndexedColors.BLUE_GREY.getIndex());
        titlePromedioStyle.setBottomBorderColor(IndexedColors.BLUE_GREY.getIndex());
        titlePromedioStyle.setLeftBorderColor(IndexedColors.BLUE_GREY.getIndex());
        titlePromedioStyle.setRightBorderColor(IndexedColors.BLUE_GREY.getIndex());

        //aplicamos color de fondo para promedioStyle
        promedioStyle.setFillForegroundColor(promedioColorBG);
        promedioStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        //aplicamos color de fondo para titlePromedioStyle
        titlePromedioStyle.setFillForegroundColor(promedioColorBG);
        titlePromedioStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        //creamos titulo

        Row titleRow = sheet.createRow(0);
        titleRow.createCell(1).setCellValue("REGISTRO AUXILIAR");
        titleRow.getCell(1).setCellStyle(titleStyle);

        //creamos encabezado con la informacion del curso
        Row informationRow=sheet.createRow(1);
        informationRow.createCell(1).setCellValue("CURSO:");
        informationRow.createCell(2).setCellValue(subcurso.getNombre());
        informationRow.createCell(3).setCellValue("NIVEL:");
        informationRow.createCell(4).setCellValue(nivel.name());
        informationRow.createCell(5).setCellValue("GRADO:");
        informationRow.createCell(6).setCellValue(grado);
        informationRow.createCell(7).setCellValue("UNIDAD:");
        informationRow.createCell(8).setCellValue(unidad);

        //creamos row para excel
        Row profesorRow = sheet.createRow(2);
        profesorRow.createCell(1).setCellValue("Profesor:");
        profesorRow.createCell(2).setCellValue(nombreProfesor);


        //aplicamos estilos a los encabezados

        for(int i=1;i<9;i++){
            informationRow.getCell(i).setCellStyle(headerStyle);
        }

        for(int i=1; i<3;i++){
            profesorRow.getCell(i).setCellStyle(headerStyle);
        }


        // Crear el encabezado
        Row headerRow = sheet.createRow(4);
        headerRow.createCell(1).setCellValue("N°");
        headerRow.createCell(2).setCellValue("APELLIDOS Y NOMBRES");
        headerRow.createCell(3).setCellValue("CRITERIO 1");
        headerRow.createCell(4).setCellValue("CRITERIO 2");
        headerRow.createCell(5).setCellValue("CRITERIO 3");
        headerRow.createCell(6).setCellValue("CRITERIO 4");
        headerRow.createCell(7).setCellValue("PROMEDIO");

        //aplicamos estilos a al header de datos

        for (int i=1;i<7;i++){
            headerRow.getCell(i).setCellStyle(headerDatosStyle);
        }
        headerRow.getCell(7).setCellStyle(titlePromedioStyle);

        int rowNum = 5;
        int nAlumnos=1;
        String ApellidosYNombres="";
        for (Alumno alumno : alumnos) {
            ApellidosYNombres=alumno.getApellido().toUpperCase()+", " + alumno.getNombre();
            Row row = sheet.createRow(rowNum++);

            row.createCell(1).setCellValue(nAlumnos);
            row.createCell(2).setCellValue(ApellidosYNombres);

            // Variables para almacenar las calificaciones y calcular el promedio
            double sumaCalificaciones = 0.0;
            int cantidadCalificaciones = 0;

            // Iterar sobre las competencias (C1 a C4)
            for (int calificacionNumero = 1; calificacionNumero <= 4; calificacionNumero++) {
                Double calificacion = notaService.obtenerCalificacionEspecificaPorAlumnoSubcursoUnidadYCalificacionNumero(
                        alumno.getUsuarioId(),
                        subcursoId,
                        unidad,
                        calificacionNumero
                );

                Cell cell = row.createCell(2 + calificacionNumero); // Columnas 2 a 6 para C1 a C4
                if (calificacion != null) {
                    // Redondear la calificación a entero
                    int calificacionRedondeada = (int) Math.round(calificacion);
                    cell.setCellValue(calificacionRedondeada);

                    sumaCalificaciones += calificacion;
                    cantidadCalificaciones++;
                } else {
                    cell.setCellValue("-");
                }
            }

            // Calcular el promedio de la unidad
            Cell promedioCell = row.createCell(7);
            if (cantidadCalificaciones > 0) {
                double promedio = sumaCalificaciones / cantidadCalificaciones;
                int promedioRedondeado = (int) Math.round(promedio);
                promedioCell.setCellValue(promedioRedondeado);
            } else {
                promedioCell.setCellValue("-");
            }
            nAlumnos++;

            for(int i=1;i<7;i++){
                row.getCell(i).setCellStyle(datosStyle);
            }
            row.getCell(7).setCellStyle(promedioStyle);
        }
        // Autoajustar el tamaño de las columnas
        for (int i = 2; i <= 7; i++) {
            sheet.autoSizeColumn(i);
        }


        // Cerrar el workbook
        workbook.write(outputStream);
        workbook.close();
    }

/////////////// REPORTES BIMESTRALES///////////////

    public void generarReporteNotasPorSubcursoYBimestre(Nivel nivel, Integer grado, Long subcursoId, Integer bimestre, OutputStream outputStream) throws IOException {
        // Crear el workbook
        Workbook workbook = new XSSFWorkbook();

        // Obtener la lista de alumnos por grado y subcurso
        List<Alumno> alumnos = alumnoService.obtenerAlumnosPorGradoYSubcurso(grado, subcursoId);

        if (alumnos.isEmpty()) {
            throw new RuntimeException("No hay alumnos en este grado, nivel y subcurso");
        }

        // Obtener información del subcurso
        Subcurso subcurso = subcursoService.obtenerSubcursoPorId(subcursoId);

        // Obtener el profesor asignado al subcurso
        Optional<AsignacionProfesor> asignacionProfesorOpt = asignacionProfesorRepository.findBySubcurso_SubcursoId(subcursoId);
        String nombreProfesor = asignacionProfesorOpt
                .map(asignacion -> asignacion.getProfesor().getNombre() + " " + asignacion.getProfesor().getApellido())
                .orElse("Sin profesor asignado");

        // Determinar las unidades que corresponden al bimestre
        int unidadInicio = (bimestre - 1) * 2 + 1;
        int unidadFin = unidadInicio + 1;

        // Crear una hoja para el subcurso y bimestre
        String nombreHoja = "Grado " + grado + " - " + nivel.name() + " - " + subcurso.getNombre() + " - Bimestre " + bimestre;
        Sheet sheet = workbook.createSheet(nombreHoja);

        //definimos estilos
        //cellStyles
        CellStyle titleStyle = workbook.createCellStyle();
        CellStyle headerStyle = workbook.createCellStyle();
        CellStyle headerDatosStyle = workbook.createCellStyle();
        CellStyle datosStyle = workbook.createCellStyle();
        XSSFCellStyle titlePromedioStyle = (XSSFCellStyle) workbook.createCellStyle();
        XSSFCellStyle promedioStyle = (XSSFCellStyle) workbook.createCellStyle();
        XSSFCellStyle titleBimestreStyle = (XSSFCellStyle) workbook.createCellStyle();
        XSSFCellStyle promedioCompetenciaStyle = (XSSFCellStyle) workbook.createCellStyle();
        XSSFCellStyle titlePromedioCompetenciaStyle = (XSSFCellStyle) workbook.createCellStyle();
        XSSFCellStyle titlePromedioBimestralStyle = (XSSFCellStyle) workbook.createCellStyle();
        XSSFCellStyle promedioBimestralStyle = (XSSFCellStyle) workbook.createCellStyle();


        //definimos un color personalizado para las celdas de promedio
        byte[] rgbColor = new byte[]{(byte) 245, (byte) 229, (byte) 35};
        XSSFColor promedioColorBG = new XSSFColor(rgbColor, null);

        //color personalidado titlebimestre
        byte[] rgbColorTitleBimestre = new byte[]{(byte) 250, (byte) 37, (byte) 218};
        XSSFColor TitleBimestreColorBG = new XSSFColor(rgbColorTitleBimestre, null);

        //color personalizado para promedioCompetencia
        byte[] rgbColorPromedioCompetencia = new byte[]{(byte) 143, (byte) 192, (byte) 245};
        XSSFColor PromedioCompetenciaColorBG = new XSSFColor(rgbColorPromedioCompetencia, null);

        //color personalizado para promedioBimestral
        byte[] rgbColorPromedioBimestral = new byte[]{(byte) 255, (byte) 226, (byte) 81};
        XSSFColor PromedioBimestralColorBG = new XSSFColor(rgbColorPromedioBimestral, null);

        //generamos y aplicamos fonts
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerFont.setFontHeightInPoints((short) 12);
        headerStyle.setFont(headerFont);

        Font titleBimestreFont = workbook.createFont();
        titleBimestreFont.setBold(true);
        titleBimestreFont.setFontHeightInPoints((short) 12);
        titleBimestreFont.setColor(IndexedColors.WHITE.getIndex());
        titleBimestreStyle.setFont(titleBimestreFont);

        Font titleFont = workbook.createFont();
        titleFont.setBold(true);
        titleFont.setFontHeightInPoints((short) 24);
        titleFont.setColor(IndexedColors.RED.getIndex());
        titleStyle.setFont(titleFont);

        Font datoFont = workbook.createFont();
        datoFont.setFontHeightInPoints((short) 12);
        datosStyle.setFont(datoFont);

        //aplicamos el font para el headerDatos
        headerDatosStyle.setFont(headerFont);
        //aplicamos el font para promedioStyle
        promedioStyle.setFont(datoFont);
        //aplicamos el font para el titlePromedioStyle
        titlePromedioStyle.setFont(headerFont);
        //aplicamos el font para promedioCriterio
        promedioCompetenciaStyle.setFont(datoFont);
        //aplicamos el font para titlePromedioCriterio
        titlePromedioCompetenciaStyle.setFont(headerFont);
        //aplicamos el font para PromedioBimestral
        promedioBimestralStyle.setFont(datoFont);
        //aplicamos el font para titlePromedioBimestral
        titlePromedioBimestralStyle.setFont(headerFont);

        //centramos en titleBimestre
        titleBimestreStyle.setAlignment(HorizontalAlignment.CENTER);
        titleBimestreStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        //estilos de bordes

        datosStyle.setBorderBottom(BorderStyle.THIN);
        datosStyle.setBorderLeft(BorderStyle.THIN);
        datosStyle.setBorderRight(BorderStyle.THIN);
        datosStyle.setBorderTop(BorderStyle.THIN);
        datosStyle.setTopBorderColor(IndexedColors.BLUE_GREY.getIndex());
        datosStyle.setBottomBorderColor(IndexedColors.BLUE_GREY.getIndex());
        datosStyle.setLeftBorderColor(IndexedColors.BLUE_GREY.getIndex());
        datosStyle.setRightBorderColor(IndexedColors.BLUE_GREY.getIndex());

        headerDatosStyle.setBorderBottom(BorderStyle.THIN);
        headerDatosStyle.setBorderLeft(BorderStyle.THIN);
        headerDatosStyle.setBorderRight(BorderStyle.THIN);
        headerDatosStyle.setBorderTop(BorderStyle.THIN);
        headerDatosStyle.setTopBorderColor(IndexedColors.BLUE_GREY.getIndex());
        headerDatosStyle.setBottomBorderColor(IndexedColors.BLUE_GREY.getIndex());
        headerDatosStyle.setLeftBorderColor(IndexedColors.BLUE_GREY.getIndex());
        headerDatosStyle.setRightBorderColor(IndexedColors.BLUE_GREY.getIndex());

        promedioStyle.setBorderBottom(BorderStyle.THIN);
        promedioStyle.setBorderLeft(BorderStyle.THIN);
        promedioStyle.setBorderRight(BorderStyle.THIN);
        promedioStyle.setBorderTop(BorderStyle.THIN);
        promedioStyle.setTopBorderColor(IndexedColors.BLUE_GREY.getIndex());
        promedioStyle.setBottomBorderColor(IndexedColors.BLUE_GREY.getIndex());
        promedioStyle.setLeftBorderColor(IndexedColors.BLUE_GREY.getIndex());
        promedioStyle.setRightBorderColor(IndexedColors.BLUE_GREY.getIndex());

        titlePromedioStyle.setBorderBottom(BorderStyle.THIN);
        titlePromedioStyle.setBorderLeft(BorderStyle.THIN);
        titlePromedioStyle.setBorderRight(BorderStyle.THIN);
        titlePromedioStyle.setBorderTop(BorderStyle.THIN);
        titlePromedioStyle.setTopBorderColor(IndexedColors.BLUE_GREY.getIndex());
        titlePromedioStyle.setBottomBorderColor(IndexedColors.BLUE_GREY.getIndex());
        titlePromedioStyle.setLeftBorderColor(IndexedColors.BLUE_GREY.getIndex());
        titlePromedioStyle.setRightBorderColor(IndexedColors.BLUE_GREY.getIndex());

        titleBimestreStyle.setBorderBottom(BorderStyle.THIN);
        titleBimestreStyle.setBorderLeft(BorderStyle.THIN);
        titleBimestreStyle.setBorderRight(BorderStyle.THIN);
        titleBimestreStyle.setBorderTop(BorderStyle.THIN);
        titleBimestreStyle.setTopBorderColor(IndexedColors.BLUE_GREY.getIndex());
        titleBimestreStyle.setBottomBorderColor(IndexedColors.BLUE_GREY.getIndex());
        titleBimestreStyle.setLeftBorderColor(IndexedColors.BLUE_GREY.getIndex());
        titleBimestreStyle.setRightBorderColor(IndexedColors.BLUE_GREY.getIndex());


        promedioCompetenciaStyle.setBorderBottom(BorderStyle.THIN);
        promedioCompetenciaStyle.setBorderLeft(BorderStyle.THIN);
        promedioCompetenciaStyle.setBorderRight(BorderStyle.THIN);
        promedioCompetenciaStyle.setBorderTop(BorderStyle.THIN);
        promedioCompetenciaStyle.setTopBorderColor(IndexedColors.BLUE_GREY.getIndex());
        promedioCompetenciaStyle.setBottomBorderColor(IndexedColors.BLUE_GREY.getIndex());
        promedioCompetenciaStyle.setLeftBorderColor(IndexedColors.BLUE_GREY.getIndex());
        promedioCompetenciaStyle.setRightBorderColor(IndexedColors.BLUE_GREY.getIndex());

        titlePromedioCompetenciaStyle.setBorderBottom(BorderStyle.THIN);
        titlePromedioCompetenciaStyle.setBorderLeft(BorderStyle.THIN);
        titlePromedioCompetenciaStyle.setBorderRight(BorderStyle.THIN);
        titlePromedioCompetenciaStyle.setBorderTop(BorderStyle.THIN);
        titlePromedioCompetenciaStyle.setTopBorderColor(IndexedColors.BLUE_GREY.getIndex());
        titlePromedioCompetenciaStyle.setBottomBorderColor(IndexedColors.BLUE_GREY.getIndex());
        titlePromedioCompetenciaStyle.setLeftBorderColor(IndexedColors.BLUE_GREY.getIndex());
        titlePromedioCompetenciaStyle.setRightBorderColor(IndexedColors.BLUE_GREY.getIndex());


        promedioBimestralStyle.setBorderBottom(BorderStyle.THIN);
        promedioBimestralStyle.setBorderLeft(BorderStyle.THIN);
        promedioBimestralStyle.setBorderRight(BorderStyle.THIN);
        promedioBimestralStyle.setBorderTop(BorderStyle.THIN);
        promedioBimestralStyle.setTopBorderColor(IndexedColors.BLUE_GREY.getIndex());
        promedioBimestralStyle.setBottomBorderColor(IndexedColors.BLUE_GREY.getIndex());
        promedioBimestralStyle.setLeftBorderColor(IndexedColors.BLUE_GREY.getIndex());
        promedioBimestralStyle.setRightBorderColor(IndexedColors.BLUE_GREY.getIndex());


        titlePromedioBimestralStyle.setBorderBottom(BorderStyle.THIN);
        titlePromedioBimestralStyle.setBorderLeft(BorderStyle.THIN);
        titlePromedioBimestralStyle.setBorderRight(BorderStyle.THIN);
        titlePromedioBimestralStyle.setBorderTop(BorderStyle.THIN);
        titlePromedioBimestralStyle.setTopBorderColor(IndexedColors.BLUE_GREY.getIndex());
        titlePromedioBimestralStyle.setBottomBorderColor(IndexedColors.BLUE_GREY.getIndex());
        titlePromedioBimestralStyle.setLeftBorderColor(IndexedColors.BLUE_GREY.getIndex());
        titlePromedioBimestralStyle.setRightBorderColor(IndexedColors.BLUE_GREY.getIndex());

        //aplicamos color de fondo para promedioStyle
        promedioStyle.setFillForegroundColor(promedioColorBG);
        promedioStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        //aplicamos color de fondo para titlePromedioStyle
        titlePromedioStyle.setFillForegroundColor(promedioColorBG);
        titlePromedioStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        //aplicamos color de fondo para titleBimestreStyle
        titleBimestreStyle.setFillForegroundColor(TitleBimestreColorBG);
        titleBimestreStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        //aplicamos color de fondo para promedioCompetenciaStyle
        promedioCompetenciaStyle.setFillForegroundColor(PromedioCompetenciaColorBG);
        promedioCompetenciaStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        //aplicamos color de fondo para titlePromedioCompetenciaStyle
        titlePromedioCompetenciaStyle.setFillForegroundColor(PromedioCompetenciaColorBG);
        titlePromedioCompetenciaStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        //aplicamos color de fondo para PromedioBimestral
        promedioBimestralStyle.setFillForegroundColor(PromedioBimestralColorBG);
        promedioBimestralStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        //aplicamos color de fondo para TitlePromedioBimestral
        titlePromedioBimestralStyle.setFillForegroundColor(PromedioBimestralColorBG);
        titlePromedioBimestralStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        //agregar fila de titulo
        Row titleRow = sheet.createRow(0);
        titleRow.createCell(1).setCellValue("Registro Bimestral");
        //Aplicamos estilos al titlerow
        titleRow.getCell(1).setCellStyle(titleStyle);

        //agregar fila de informacion
        Row informationRow = sheet.createRow(1);
        informationRow.createCell(1).setCellValue("CURSO:");
        informationRow.createCell(2).setCellValue(subcurso.getNombre());
        informationRow.createCell(3).setCellValue("NIVEL:");
        informationRow.createCell(4).setCellValue(nivel.name());
        informationRow.createCell(8).setCellValue("GRADO");
        informationRow.createCell(11).setCellValue(grado);
        informationRow.createCell(12).setCellValue("BIMESTRE:");
        informationRow.createCell(15).setCellValue(bimestre);

        //Aplicacion estilos al informationRow

        Iterator<Cell> informationRowIterator = informationRow.cellIterator();
        while (informationRowIterator.hasNext()) {
            Cell cell = informationRowIterator.next();
            cell.setCellStyle(headerStyle);
        }
        //crear fila de profesor
        Row profesorRow = sheet.createRow(2);
        profesorRow.createCell(1).setCellValue("Profesor:");
        profesorRow.createCell(2).setCellValue(nombreProfesor);
        //aplicamos estilos a la profesorRow
        for (int i = 1; i < 3; i++) {
            profesorRow.getCell(i).setCellStyle(headerStyle);
        }


        // Crear el encabezado
        Row headerRow = sheet.createRow(5);
        //creamos celdas para aplicar estilos a celdas fucionadas
        for (int i = 1; i < 5; i++) {
            headerRow.createCell(i);
        }
        //Crear subencabezado
        Row subHeaderRow = sheet.createRow(4);
        subHeaderRow.createCell(1).setCellValue("N°");
        subHeaderRow.createCell(2).setCellValue("COMPETENCIAS/CRITERIOS");
        subHeaderRow.createCell(3);
        //aplicamos estilos a algunas celdas de subHeaderRow
        for (int i = 1; i < 4; i++) {
            subHeaderRow.getCell(i).setCellStyle(headerDatosStyle);
        }

        subHeaderRow.createCell(4).setCellValue("Bimestre " + bimestre);
        for (int i = 5; i < 17; i++) {
            subHeaderRow.createCell(i);
        }

        for (int i = 4; i < 17; i++) {
            subHeaderRow.getCell(i).setCellStyle(titleBimestreStyle);
        }
        //creamos filas adicionales para fusionar
        //creamos post encabezado
        Row postHeaderRow = sheet.createRow(6);
        postHeaderRow.createCell(1);
        postHeaderRow.createCell(2).setCellValue("APELLIDOS Y NOMBRES");
        postHeaderRow.createCell(3);
        //fusion de filas
        sheet.addMergedRegion(new CellRangeAddress(4, 6, 1, 1));
        sheet.addMergedRegion(new CellRangeAddress(4, 5, 2, 3));
        sheet.addMergedRegion(new CellRangeAddress(5, 6, 16, 16));
        //fusion de columnas
        sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 4));
        sheet.addMergedRegion(new CellRangeAddress(4, 4, 4, 16));
        sheet.addMergedRegion(new CellRangeAddress(6, 6, 2, 3));
        sheet.addMergedRegion(new CellRangeAddress(1, 1, 4, 7));
        sheet.addMergedRegion(new CellRangeAddress(1, 1, 8, 10));
        sheet.addMergedRegion(new CellRangeAddress(1, 1, 12, 14));

        //fusion de las celdas de la cabecera de Competencias
        for (int i = 4; i < 14; i = i + 3) {
            sheet.addMergedRegion(new CellRangeAddress(5, 5, i, i + 2));
        }


        //agregamos filas de competencias
        int colIndex = 4;
        headerRow.createCell(colIndex + 1);
        headerRow.createCell(colIndex + 2);
        headerRow.createCell(colIndex + 3);
        headerRow.createCell(colIndex++).setCellValue("C1");
        postHeaderRow.createCell(colIndex - 1).setCellValue("U" + unidadInicio);
        colIndex++;
        headerRow.createCell(colIndex + 1);
        headerRow.createCell(colIndex + 2);
        headerRow.createCell(colIndex + 3);
        postHeaderRow.createCell(colIndex - 1).setCellValue("U" + unidadFin);
        postHeaderRow.createCell(colIndex++).setCellValue("P");
        headerRow.createCell(colIndex++).setCellValue("C2");
        postHeaderRow.createCell(colIndex - 1).setCellValue("U" + unidadInicio);
        colIndex++;
        headerRow.createCell(colIndex + 1);
        headerRow.createCell(colIndex + 2);
        headerRow.createCell(colIndex + 3);
        postHeaderRow.createCell(colIndex - 1).setCellValue("U" + unidadFin);
        postHeaderRow.createCell(colIndex++).setCellValue("P");
        headerRow.createCell(colIndex++).setCellValue("C3");
        postHeaderRow.createCell(colIndex - 1).setCellValue("U" + unidadInicio);
        colIndex++;
        headerRow.createCell(colIndex + 1);
        headerRow.createCell(colIndex + 2);
        headerRow.createCell(colIndex + 3);
        postHeaderRow.createCell(colIndex - 1).setCellValue("U" + unidadFin);
        postHeaderRow.createCell(colIndex++).setCellValue("P");
        headerRow.createCell(colIndex++).setCellValue("C4");
        postHeaderRow.createCell(colIndex - 1).setCellValue("U" + unidadInicio);
        colIndex++;
        postHeaderRow.createCell(colIndex - 1).setCellValue("U" + unidadFin);
        postHeaderRow.createCell(colIndex++).setCellValue("P");
        postHeaderRow.createCell(colIndex);

        // Agregar columna para el promedio del bimestre
        headerRow.createCell(colIndex).setCellValue("P");
        //aplicamos estilos a headerRow
        Iterator<Cell> headerRowIterator = headerRow.cellIterator();
        while (headerRowIterator.hasNext()) {
            Cell cell = headerRowIterator.next();
            cell.setCellStyle(headerDatosStyle);
            if (!headerRowIterator.hasNext()) {
                cell.setCellStyle(titlePromedioBimestralStyle);
            }
        }

        Iterator<Cell> postHeaderRowIterator = postHeaderRow.cellIterator();
        while (postHeaderRowIterator.hasNext()) {
            Cell cell = postHeaderRowIterator.next();
            cell.setCellStyle(headerDatosStyle);
        }

        for (int i = 6; i < 18; i = i + 3) {
            postHeaderRow.getCell(i).setCellStyle(titlePromedioCompetenciaStyle);
        }


        int rowNum = 7;  // Comenzar después de la fila del encabezado
        int nAlumnos = 1;
        for (Alumno alumno : alumnos) {
            Row row = sheet.createRow(rowNum++);
            colIndex = 1;

            row.createCell(colIndex++).setCellValue(nAlumnos);
            row.getCell(colIndex - 1).setCellStyle(datosStyle);
            row.createCell(colIndex++).setCellValue(alumno.getApellido().toUpperCase() + ", " + alumno.getNombre());
            row.createCell(colIndex);
            row.getCell(colIndex - 1).setCellStyle(datosStyle);
            row.getCell(colIndex).setCellStyle(datosStyle);
            //fusionamos las columnas en las celdas de los nombres
            sheet.addMergedRegion(new CellRangeAddress(rowNum - 1, rowNum - 1, colIndex - 1, colIndex));
            double sumaPromediosUnidades = 0.0;
            int unidadesContadas = 0;

            colIndex++;
            // Iterar sobre las competencias (C1 a C4)
            for (int calificacionNumero = 1; calificacionNumero <= 4; calificacionNumero++) {
                // Variables para almacenar las calificaciones y calcular el promedio de la unidad
                double sumaCalificaciones = 0.0;
                int cantidadCalificaciones = 0;
                // Iterar sobre las unidades del bimestre
                for (int unidad = unidadInicio; unidad <= unidadFin; unidad++) {
                    Double calificacion = notaService.obtenerCalificacionEspecificaPorAlumnoSubcursoUnidadYCalificacionNumero(
                            alumno.getUsuarioId(),
                            subcursoId,
                            unidad,
                            calificacionNumero
                    );

                    Cell cell = row.createCell(colIndex++);
                    if (calificacion != null) {
                        // Redondear la calificación a entero
                        int calificacionRedondeada = (int) Math.round(calificacion);
                        cell.setCellValue(calificacionRedondeada);

                        sumaCalificaciones += calificacion;
                        cantidadCalificaciones++;
                    } else {
                        cell.setCellValue("-");
                    }
                    cell.setCellStyle(datosStyle);
                }

                // Calcular el promedio de la unidad
                Cell promedioUnidadCell = row.createCell(colIndex++);
                if (cantidadCalificaciones > 0) {
                    double promedioUnidad = sumaCalificaciones / cantidadCalificaciones;
                    int promedioUnidadRedondeado = (int) Math.round(promedioUnidad);
                    promedioUnidadCell.setCellValue(promedioUnidadRedondeado);
                    sumaPromediosUnidades += promedioUnidad;
                    unidadesContadas++;
                } else {
                    promedioUnidadCell.setCellValue("-");
                }
                promedioUnidadCell.setCellStyle(promedioCompetenciaStyle);

            }


            // Calcular el promedio del bimestre
            Cell promedioBimestreCell = row.createCell(colIndex);
            if (unidadesContadas > 0) {
                double promedioBimestre = sumaPromediosUnidades / unidadesContadas;
                int promedioBimestreRedondeado = (int) Math.round(promedioBimestre);
                promedioBimestreCell.setCellValue(promedioBimestreRedondeado);
                promedioBimestreCell.setCellStyle(promedioBimestralStyle);
            } else {
                promedioBimestreCell.setCellValue("-");
            }
            nAlumnos++;


        }

        // Autoajustar el tamaño de las columnas
        int totalColumns = colIndex + 1;
        for (int i = 0; i < totalColumns; i++) {
            sheet.autoSizeColumn(i);
        }

        // Escribir el workbook en el OutputStream para enviar al frontend
        workbook.write(outputStream);
        workbook.close();
    }
}

