/* $.ajax({
    url: "https://api.athenahealth.com/preview1/195900/patients/1",
    method: "GET",
    beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer btacf3ysgr3m5xzz6wnzkn5h');
    }
}).then(function (response) {
    console.log(response);
});
 */

// let smart = FHIR.client({
//     serviceUrl: 'https://r4.smarthealthit.org',
//     patientId: '190524df-4de5-4c01-8560-8b41e23c3b84'
// });

// console.log("smart test");
/* var todaysDiagnoses = smart.api.search({ type: 'Condition', query: { "date-recorded": '2018-05-01' } });
console.log(todaysDiagnoses); */

$.ajax({
    url: "https://r4.smarthealthit.org/Patient",
    method: "GET",
    /* beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer btacf3ysgr3m5xzz6wnzkn5h'); }*/
}).then(function (response) {
    $("p").text(response.entry[0].resource.address[0].city);
});

/* "diagnostics": "Unknown resource type 'PatientId' - Server knows how to handle: [Appointment, Account, ReferralRequest, Provenance, Questionnaire, ExplanationOfBenefit, DocumentManifest, Specimen, AllergyIntolerance, CarePlan, Goal, StructureDefinition, EnrollmentRequest, EpisodeOfCare, OperationOutcome, Medication, Procedure, List, ConceptMap, Subscription, OperationDefinition, ValueSet, DocumentReference, Order, Immunization, Parameters, Device, VisionPrescription, Media, Conformance, EligibilityResponse, ProcedureRequest, DeviceUseRequest, DeviceMetric, Flag, RelatedPerson, SupplyRequest, AppointmentResponse, Practitioner, Observation, MedicationAdministration, Slot, EnrollmentResponse, Binary, MedicationStatement, Contract, Person, CommunicationRequest, RiskAssessment, TestScript, Basic, Group, PaymentNotice, Organization, ImplementationGuide, ClaimResponse, EligibilityRequest, ProcessRequest, MedicationDispense, DiagnosticReport, ImagingObjectSelection, ImagingStudy, HealthcareService, DataElement, DeviceComponent, FamilyMemberHistory, NutritionOrder, Encounter, Substance, AuditEvent, MedicationOrder, SearchParameter, PaymentReconciliation, Communication, Condition, Composition, DetectedIssue, Bundle, DiagnosticOrder, Patient, Coverage, OrderResponse, QuestionnaireResponse, DeviceUseStatement, ProcessResponse, NamingSystem, Schedule, SupplyDelivery, ClinicalImpression, MessageHeader, Claim, BodySite, ImmunizationRecommendation, Location]"
 */