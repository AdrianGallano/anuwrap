<?php

namespace Src\Models;

use PDOException;

class Report
{
    private $pdo;
    function __construct($pdo)
    {
        $this->pdo = $pdo;
    }
    function get($id)
    {
        $queryStr = "SELECT * FROM Report WHERE report_id = :id";
        $stmt = $this->pdo->prepare($queryStr);

        try {
            $stmt->execute(array(
                "id" => $id
            ));

            $report = $stmt->fetch();
            return $report;
        } catch (PDOException $e) {
            error_log($e->getMessage());
            return null;
        }
    }

    function getAll($workspace_id)
    {
        $queryStr = "SELECT Report.*, ReportType.* FROM Report 
        JOIN ReportType ON Report.report_type_id = ReportType.report_type_id 
        WHERE Report.workspace_id = :workspace_id";

        $stmt = $this->pdo->prepare($queryStr);

        try {
            $stmt->execute(array(
                "workspace_id" => $workspace_id
            ));

            $report = $stmt->fetchAll();
            return $report;
        } catch (PDOException $e) {
            error_log($e->getMessage());
            var_dump($e->getMessage());
            return null;
        }
    }
    function create($request)
    {
        $title = $request["title"];
        $description = $request["description"];
        $content = $request["content"];
        $report_type_id = $request["report_type_id"];
        $workspace_id = $request["workspace_id"];

        $queryStr = "INSERT INTO 
        Report(title, description, content, report_type_id, workspace_id) VALUES
        (:title, :description, :content, :report_type_id, :workspace_id)";

        $stmt = $this->pdo->prepare($queryStr);

        try {
            $stmt->execute(array(
                "title" => $title,
                "description" => $description,
                "content" => $content,
                "report_type_id" => $report_type_id,
                "workspace_id" => $workspace_id,
            ));
            return true;
        } catch (PDOException $e) {
            error_log($e->getMessage());
            return false;
        }
    }


    function delete($id)
    {
        $queryStr = "DELETE FROM Report WHERE report_id = :id";

        $stmt = $this->pdo->prepare($queryStr);
        try {
            $stmt->execute(
                array(
                    "id" => $id,
                )
            );
            return true;
        } catch (PDOException $e) {
            error_log($e->getMessage());
            return false;
        }
    }
    function update($request, $id)
    {
        $title = $request["title"];
        $description = $request["description"];
        $content = $request["content"];
        $report_type_id = $request["report_type_id"];
        $workspace_id = $request["workspace_id"];

        $queryStr = "UPDATE Report 
            SET title=:title, description=:description, content=:content, report_type_id=:report_type_id, workspace_id=:workspace_id WHERE report_id = :id";

        $stmt = $this->pdo->prepare($queryStr);
        try {
            $stmt->execute(
                array(
                    "title" => $title,
                    "description" => $description,
                    "content" => $content,
                    "report_type_id" => $report_type_id,
                    "workspace_id" => $workspace_id,
                    "id" => $id
                )
            );
            return true;
        } catch (PDOException $e) {
            error_log($e->getMessage());
            return false;
        }
    }

    function getAllReportType()
    {
        $queryStr = "SELECT * FROM ReportType";
        $stmt = $this->pdo->prepare($queryStr);

        try {
            $stmt->execute();
            $reportType = $stmt->fetchAll();
            return $reportType;
        } catch (PDOException $e) {
            error_log($e->getMessage());
            return null;
        }
    }
}
